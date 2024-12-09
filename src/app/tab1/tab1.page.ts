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
  filterData:any[] = []
  searchQuery:string = ''

  constructor(private api: ApiService, private toastController: ToastController) {
    this.loadEvents()
  }

  private loadEvents(){
    this.api.genericGet('get-events').subscribe(
      (response:any)=> {
        const data = response
        this.allData = data
        this.allData.forEach((event:any) => {
          this.api.genericGet(`get-attendance/${event._id}`).subscribe(
            (attendanceResponse: any) => {
              event.attendanceCount = attendanceResponse.count || attendanceResponse.length || 0;
            },
            (error: any) => {
              console.error(`Error fetching attendance for event ${event._id}`, error);
              event.attendanceCount = 0;
            }
          );
        });
        this.filterData = data
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

  filterEvents() {
    const query = this.searchQuery.toLowerCase();
    this.filterData = this.allData.filter((event:any) => 
      event.eventName.toLowerCase().includes(query) || 
      event.category?.toLowerCase().includes(query)
    );
  }

}
