import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  currentMessage = new BehaviorSubject(null);
  token =
    'eqYRSwZN5exMVeVF26aRlw:APA91bEXL3ZBv3CJ8UZ8m6I68ZjiPQHLo22A-Z3gpUtzj5HLJg4O6AXfXNJ9ADUr9mXwgP1aHG99_pAVQLfF_dCmN-I9Pu8WwvMKJArsPb2YRQspzpbYfDluaiAIB9qiu-gZhP1a67X8';
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient
  ) {}

  requestPermission() {
    this.angularFireMessaging.requestPermission
      .pipe(mergeMapTo(this.angularFireMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  listen() {
    return this.angularFireMessaging.messages;
  }

  pushNotification() {
    const body = {
      notification: {
        title: 'QUIZ!!',
        body: 'Se ha diseñado un nuevo quiz, ¿quieres realizarlo?',
      },
      to: this.token,
    };
    const headers = {
      Authorization:
        'key=AAAA7DLi-go:APA91bFFhMWH9VxSI6JZYaMWgAofpdNziqyMyTxQpv5OImIE5jEO2uA87IBZ8YFCSAXTPoicsxACuvcXyZxQuFz26LNhywA9QeCEJwQxvz6WbvjkI56yBwE4pjaOPheQoURAUgzLb4k8',
      'Content-Type': 'application/json',
    };
    return this.http.post<any>('https://fcm.googleapis.com/fcm/send', body, {
      headers,
    });
  }
}
