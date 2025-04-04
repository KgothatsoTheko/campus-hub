import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page  implements OnInit {

  currentUser:any
  allData:any = []
  generalAnnoncements:any = []
  courseAnnoncements:any = []
  selectedSegment: string = 'first'; // Default segment

  constructor(private storage: Storage, private api: ApiService, private location: Location,  private toastController: ToastController) {
    this.loadAnnouncements()
  }

  async ngOnInit() {
    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');
    console.log(this.currentUser);
    
    
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  public loadAnnouncements(){
    this.api.genericGet('get-announcements').subscribe(
      (response: any) => {
        this.allData = response;
        // Filter general announcements (no course specified)
      this.generalAnnoncements = this.allData.filter((announcement: any) => !announcement.course);

      // Filter course-specific announcements for the current user
      this.courseAnnoncements = this.allData.filter(
        (announcement: any) => announcement.course === this.currentUser?.data?.courseCode
      );

      console.log("General Announcements:", this.generalAnnoncements);
      console.log("Course Announcements:", this.courseAnnoncements);
      },
      (error: any) => {
        this.presentToast(`Error: ${error.error}`, 'bottom');
      }
    );
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadAnnouncements()
      event.target.complete();
    }, 2000);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value; // Update selected segment
  }

}
