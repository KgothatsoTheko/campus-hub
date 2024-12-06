import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  currentUser:any

  constructor(private storage: Storage) { }

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');
    
  }

}
