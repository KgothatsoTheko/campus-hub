import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  allCourses:any = []
  courses:any=[]

  registerForm = new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    studentEmail: new FormControl('',[Validators.required, Validators.email]),
    courseCode: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(private router: Router, private loadingController: LoadingController, private api: ApiService, private toastController: ToastController) { 
    this.loadCourses()
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
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

  loadCourses(){
    this.api.genericGet('get-distance-courses').subscribe(
      (response: any) => {
        this.allCourses = response.faculties;  // Use response.faculties instead of response
        console.log(this.allCourses);
        this.courses = this.allCourses.flatMap((faculty: any) => 
          faculty.courses.map((course: any) => course.name)
        );
        console.log(this.courses);
      },
      (error: any) => {
        this.presentToast(`failed: ${error.error}.`, 'bottom');
      }
  );

  }

  async register(){
    if (this.registerForm.invalid) {
      this.presentToast('Please fill in all fields correctly.', 'bottom');
      return;
    }
    const newRegister = {
      ...this.registerForm.value,
      studentEmail: this.registerForm.value.studentEmail?.toLocaleLowerCase()
    }

    const loading = await this.presentLoading('Registering...');

    this.api.genericPost('register', newRegister).subscribe(
      async (response:any)=> {
        await loading.dismiss();
        console.log(`response: ${response}`);
        
       // Call the toast function with the response message and position
       this.presentToast('Registration successful!', 'bottom');
        
       // Navigate to confirmation page
       this.router.navigate(['/login']);

       this.registerForm.reset()
     },
     async(error:any) => {
      await loading.dismiss();
      console.log(`Error: ${error.error}`);
       // Show an error toast if registration fails
       this.presentToast(`Registration failed: ${error.error}.`, 'bottom');
     }
    )
  }

}
