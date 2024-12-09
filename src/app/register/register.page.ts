import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm = new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    studentEmail: new FormControl('',[Validators.required, Validators.email]),
    courseCode: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(private router: Router, private api: ApiService, private toastController: ToastController) { }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  register(){
    if (this.registerForm.invalid) {
      this.presentToast('Please fill in all fields correctly.', 'bottom');
      return;
    }
    const newRegister = {
      ...this.registerForm.value,
      studentEmail: this.registerForm.value.studentEmail?.toLocaleLowerCase()
    }
    this.api.genericPost('register', newRegister).subscribe(
      (response:any)=> {
        console.log(`response: ${response}`);
        
       // Call the toast function with the response message and position
       this.presentToast('Registration successful!', 'bottom');
        
       // Navigate to confirmation page
       this.router.navigate(['/login']);

       this.registerForm.reset()
     },
     (error:any) => {
      console.log(`Error: ${error.error}`);
       // Show an error toast if registration fails
       this.presentToast(`Registration failed: ${error.error}.`, 'bottom');
     }
    )
  }

}
