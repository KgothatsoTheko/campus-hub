import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-virtual-student',
  templateUrl: './virtual-student.page.html',
  styleUrls: ['./virtual-student.page.scss'],
})
export class VirtualStudentPage implements OnInit {

  currentUser: any;
  isRotating: boolean = false;

  constructor(private storage: Storage, private router: Router, private location: Location) {}

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');
    console.log(this.currentUser);
  }

  goBack() {
    this.location.back();
  }

  toggleRotation() {
    this.isRotating = !this.isRotating;
  }

}
