import { Injectable } from '@angular/core';
import { PushNotifications, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  currentUser:any
  myCourse!:string
  private backendUrl = 'https://vc-app-v1.vercel.app/api1'; // Replace with your backend URL

  constructor(private router: Router, private storage: Storage, private http: HttpClient) { 
  }

  async getCurrentUser() {
    // Initialize Ionic Storage
    await this.storage.create();
    // Retrieve user data from Ionic Storage
    this.currentUser = await this.storage.get('currentUser');

    this.myCourse = this.currentUser?.data?.courseCode

    console.log(this.myCourse)
    
  }

  async initPush() {
    if (Capacitor.isNativePlatform()) {
      await this.getCurrentUser();
      this.registerPush();
    }else {
      console.warn('Push notifications are only supported on native platforms.');
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        console.error('Push notifications permission denied.');
      }
    });

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('My token: ' + JSON.stringify(token));
      // this.saveTokenToBackend(token.value); // Save token for later use
      this.subscribeToTopic(token.value, 'events');
      this.subscribeToTopic(token.value, 'general-announcements');
      if (this.myCourse) {
        this.subscribeToTopic(token.value, this.myCourse.split(" ").join("-"));
      } else {
        console.warn('Course code is not available yet. Skipping subscription.');
      }
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error during registration: ' + JSON.stringify(error));
    });
    

    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', async (notification: PushNotificationActionPerformed) => {
      const data = notification.notification.data;
      console.log('Action performed: ' + JSON.stringify(notification.notification));
      if (data && data.detailsId) {
        this.router.navigateByUrl(`/dashboard/tab1`);
      } else {
        console.warn('Notification data is missing or invalid.');
      }
    });
  }

  private saveTokenToBackend(token: string) {
    // Example: Save token to your backend
    this.http.post(`${this.backendUrl}/save-token`, { token }).subscribe({
      next: () => console.log('Token saved to backend.'),
      error: (err) => console.error('Error saving token to backend:', err),
    });
  }

  private subscribeToTopic(token: string, topic: string) {
    // Inform your backend to subscribe the token to a topic
    this.http.post(`${this.backendUrl}/subscribe-token`, { token, topic }).subscribe({
      next: () => console.log(`Subscribed to topic: ${topic}`),
      error: (err) => console.error('Error subscribing to topic:', err),
    });
  }
}
