import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { User, UserLogin, UserResponse } from '../models/usuario.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public token: string;
  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  getAllUsers() {
    return this.apollo.query({
      query: gql`
        {
          allUsers {
            id, uid, name, nickname
          }
        }
      `,
    });
  }

  registerUser(user: User) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        registerUser(user: {
          email: "${user.email}",
          name: "${user.name}" ,
          password: "${user.password}",
          password_confirmation: "${user.password_confirmation}",
        }) {
          status
        }
      }
      `,
    }).toPromise();
  }

  loginUser(user: User) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        logInUser(session: {
          email: "${user.email}",
          password: "${user.password}",
        }){
          token, client, uid, error
        }
      }
      `,
    }).toPromise().then((res: UserResponse) => {
      this.token = res.data.logInUser.token;
      if (res.data.logInUser.error) {
        alert('Datos invalidos');
      } else {
        localStorage.setItem('token', JSON.stringify(this.token));
        localStorage.setItem('client', JSON.stringify(res.data.logInUser.client));
        localStorage.setItem('uid', JSON.stringify(res.data.logInUser.uid));
        this.router.navigate(['/learn']);
      }
    });
  }

  validarUser() {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const client = JSON.parse(localStorage.getItem('client')) || null;
    const uid = JSON.parse(localStorage.getItem('uid')) || null;
    console.log(token, client, uid);
    return this.apollo.mutate({
      mutation: gql`
      query {
        validateToken(headers: {
          token: "${token}",
          client: "${client}",
          uid: "${uid}",
        }){
          token, error
        }
      }
      `,
    }).toPromise().then((res: any) => {
      this.token = res.data.validateToken.token;
      const error = res.data.validateToken.error;
      if ( this.token && !error) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    });
  }

  getUser(): UserLogin{
    return {id: 0, name: 'Andres Velandia', email: 'anfvelandiaer@unal.edu.co'};
  }


}
