import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  allData:any

  constructor(private api: ApiService, private toastController: ToastController) {
    this.loadEvents()
  }

  private loadEvents(){
    this.api.genericGet('get-events').subscribe(
      (response:any)=> {
        const data = response
        this.allData = data
        console.log(data);
      },
      (error:any)=> {
        this.presentToast('Data could not be fetched', 'bottom')
      }
    )
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadEvents()
      event.target.complete();
    }, 2000);
  }

}
