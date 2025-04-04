import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private loadingController: LoadingController, private api: ApiService, private toastController: ToastController, private storage: Storage) { }

  loginForm = new FormGroup({
    studentEmail: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
  })

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      duration: 5000, // Optional: auto-dismiss after 5 seconds
    });
    await loading.present();
    return loading;
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }


  async login() {
    if (this.loginForm.invalid) {
      this.presentToast('Please fill in all fields correctly.', 'bottom');
      return;
    }
  
    const newLogin = {
      ...this.loginForm.value,
      studentEmail: this.loginForm.value.studentEmail?.toLocaleLowerCase()
    };
  
    const loading = await this.presentLoading('Logging in...');
  
    this.api.genericPost('login', newLogin).subscribe(
      async (response: any) => {
        await loading.dismiss();
  
        await this.storage.set('currentUser', response);
        this.presentToast('Login successful!', 'bottom');
        this.loginForm.reset();
        this.router.navigate(['/dashboard/tab1']);
      },
      async (error: any) => {
        await loading.dismiss();
        this.presentToast(`Login failed. ${error.error}`, 'bottom');
      }
    );
  }
  

}
