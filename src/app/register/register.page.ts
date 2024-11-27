import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm = new FormGroup({
    fullName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    course: new FormControl('',[Validators.required]),
    cellNumber: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(private router: Router) { }

  register(){

    this.router.navigate(['/login'])

  }

}
