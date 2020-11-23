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
  tokens = [
    'eqYRSwZN5exMVeVF26aRlw:APA91bEXL3ZBv3CJ8UZ8m6I68ZjiPQHLo22A-Z3gpUtzj5HLJg4O6AXfXNJ9ADUr9mXwgP1aHG99_pAVQLfF_dCmN-I9Pu8WwvMKJArsPb2YRQspzpbYfDluaiAIB9qiu-gZhP1a67X8', 'c_QKGWyd_wTyq6xbYIh9rl:APA91bFFtqzLT7gq1wRMwZDW3Xi2Lk4BTKBsapR6PPR-DI2VWbm-GbV2VPvbfipIFqs7bnXnsRdIq42QZ8LkOswZTxod4NmDe64ius7VV2_Dw3RRSV2DBlAhFOwMr1ZsfJeg2K7_R_Sk' ];

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
    for (const token of this.tokens) {
      console.log('aaa');
      
      const body = {
        notification: {
          title: 'QUIZ!!',
          body: 'Se ha diseñado un nuevo quiz, ¿quieres realizarlo?',
        },
        to: token,
      };
      const headers = {
        Authorization:
          'key=AAAA7DLi-go:APA91bFFhMWH9VxSI6JZYaMWgAofpdNziqyMyTxQpv5OImIE5jEO2uA87IBZ8YFCSAXTPoicsxACuvcXyZxQuFz26LNhywA9QeCEJwQxvz6WbvjkI56yBwE4pjaOPheQoURAUgzLb4k8',
        'Content-Type': 'application/json',
      };
      this.http.post<any>('https://fcm.googleapis.com/fcm/send', body, {
        headers,
      }).subscribe((response) => {
        console.log(response);
      }); 
      console.log('bbb');

    }
  }
}
