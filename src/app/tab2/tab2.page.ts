import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  allData:any = []
  filterData:any = []
  selectedCategory:string | null = null

  constructor(private storage: Storage, private api: ApiService, private location: Location,  private toastController: ToastController) {
    this.loadEvents()
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  categories = [
    { name: 'Sports', icon: 'football' },
    { name: 'Wellness', icon: 'cafe' },
    { name: 'Career Centre', icon: 'business' },
    { name: 'Social Committees', icon: 'chatbubbles' },
    { name: 'VC Cares', icon: 'heart-circle' },
    { name: 'Academics', icon: 'school' },
  ];

  public loadEvents(){
    this.api.genericGet('get-events').subscribe(
      (response: any) => {
        this.allData = response;
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
        this.filterData = this.allData; // Initialize filtered data
      },
      (error: any) => {
        this.presentToast(`Error: ${error.error}`, 'bottom');
      }
    );
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    this.filterData = category
      ? this.allData.filter((event: any) => event.category === category)
      : this.allData; // Show all events if no category is selected
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadEvents()
      event.target.complete();
    }, 2000);
  }

}
