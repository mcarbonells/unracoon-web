import { Component } from '@angular/core';
import { MessageNotification, Notification } from './models/notification.model';
import { FirebaseService } from './services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'unracoon-web';
  notification: Notification;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.requestPermission();
    this.firebaseService.listen().subscribe((payload: MessageNotification) => {
      this.notification = payload.notification;
      this.showAlert();
    });
  }

  verToker() {
    this.firebaseService.pushNotification().subscribe((response) => {});
  }

  showAlert() {
    if (this.notification) {
      Swal.fire({
        title: this.notification.title,
        text: this.notification.body,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Realizar',
        cancelButtonText: 'Después...',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Redireccionar');
        }
      });
    }
  }
}
