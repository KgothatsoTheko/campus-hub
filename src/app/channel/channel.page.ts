import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {
  
  channels: any[] = [];
  currentUser!: any;

  constructor(
    private location: Location,
    private api: ApiService,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');

    
    // this.loadChannels();
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  loadChannels() {
    
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // this.loadChannels(); 
      event.target.complete();
    }, 2000);
  }

  goBack() {
    this.location.back();
  }

}

