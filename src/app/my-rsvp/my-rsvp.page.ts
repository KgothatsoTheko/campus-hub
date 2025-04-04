import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-rsvp',
  templateUrl: './my-rsvp.page.html',
  styleUrls: ['./my-rsvp.page.scss'],
})
export class MyRsvpPage implements OnInit {
  attendance: any[] = [];
  bookedEvent: any[] = [];
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

    // Load attendance and mentors
    this.loadAttendance();
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  loadAttendance() {
    // Clear current data to prevent duplication
    this.bookedEvent = [];
    this.attendance = [];

    this.api.genericGet(`get-attendance2/${this.currentUser.data._id}`).subscribe(
      (res: any) => {
        this.attendance = res;
        this.attendance.forEach((event) => {
          this.api.genericGet(`events/${event.eventId}`).subscribe(
            (eventRes) => {
              this.bookedEvent.push(eventRes);
            },
            (error) => {
              this.presentToast(`Something went wrong: ${error}`, 'bottom');
            }
          );
        });
      },
      (error) => {
        this.presentToast(`Something went wrong: ${error}`, 'bottom');
      }
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadAttendance(); // Call the same function to reload data
      event.target.complete();
    }, 2000);
  }

  goBack() {
    this.location.back();
  }

}
