import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private storage: Storage, private router: Router, private toastController: ToastController, private menuController: MenuController) {}

  async signOut() {

      // Initialize Ionic Storage
      await this.storage.create();

    // Clear storage
    await this.storage.clear();
  
    // Show a toast
    const toast = await this.toastController.create({
      message: 'Come back soon',
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
  
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  goToSupport(){
    this.router.navigate(['/dashboard/support']);
      this.menuController.close()
  }

  goToChannel(){
    this.router.navigate(['/dashboard/channels']);
      this.menuController.close()
  }

  goToRSVP(){
    this.router.navigate(['/dashboard/my-rsvp']);
      this.menuController.close()
  }
}


