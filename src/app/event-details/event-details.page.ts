import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: any;
  currentUser!:any

  constructor(private route: ActivatedRoute, private storage: Storage, private api: ApiService, private location: Location,  private toastController: ToastController) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.api.genericGet(`events/${id}`).subscribe(
        (res:any) => {
          this.event = res;
        },
        (error:any) => {
          console.error('Error fetching mentor details:', error);
        }
      );
    }

    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');
    
  }

  async presentToast(message: string, position: 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    toast.present();
  }

  goBack() {
    this.location.back()
  }

  // Alert buttons with dynamic behavior
  createAlertButtons(event: any) {
    return [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm RSVP',
        role: 'confirm',
        handler: () => {
          this.bookMentor(event);
        },
      },
    ];
  }

  // book a mentor
  bookMentor(event: any) {
    const bookingData = {
      userId: this.currentUser.data._id, 
      eventId: event._id,
      date: event.date,
      time: event.time,
      status: 'attending',
      where: event.where,
    };

    this.api.genericPost('add-attendance', bookingData).subscribe(
      (response:any) => {
        this.presentToast('RSVP successful!', 'bottom');
      },
      (error:any) => {
        this.presentToast(`RSVP failed: ${error.error}`, 'bottom');
      }
    );
  }

}
