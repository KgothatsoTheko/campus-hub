import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  currentUser:any

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();

    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');

    if(this.currentUser){
      // Navigate to the login page
    this.router.navigate(['/dashboard/tab1']);
    }

  }

}
