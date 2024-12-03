import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  events:any


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


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: []
  };

  private loadEvents(){
    this.api.genericGet('get-events').subscribe(
      (response:any)=> {
        this.events = response
        const allEvents = this.events.map((eve:any)=> ({
          title: eve.eventName,
          date: eve.date.slice(0,10),
        })) 
        this.calendarOptions = {
          ...this.calendarOptions,
          events: allEvents, //Update events dynamically
        }
      },
      (error:any)=> {
        this.presentToast(`Something went wrong... ${error.error}`, 'bottom');
      }
    )
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadEvents()
      event.target.complete();
    }, 2000);
  }

}
