import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  currentUser:any

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');
    
  }

  viewID(){
    this.router.navigate(['/dashboard/virtual-student']);
  }

}
