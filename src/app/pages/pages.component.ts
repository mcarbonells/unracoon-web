import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MessageNotification, Notification } from '../models/notification.model';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  notification: Notification;
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.requestPermission();
    this.firebaseService.listen().subscribe((payload: MessageNotification) => {
      this.notification = payload.notification;
      this.showAlert();
    });
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
          this.router.navigateByUrl('/learn/weekQuiz/quiz');
        }
      });
    }
  }

}
