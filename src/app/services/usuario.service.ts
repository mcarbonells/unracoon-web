import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { User, UserLogin, UserResponse } from '../models/usuario.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public user: UserLogin;
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
    });
  }

  loginUser(user: User) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        logInUser(user: {
          email: "${user.email}",
          password: "${user.password}",
        }) { data {
          id, name, email
        }
        }
      }
      `,
    }).toPromise().then((res: UserResponse) => {
      this.user = res.data.logInUser.data;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  validarUser() {
    this.user = JSON.parse(localStorage.getItem('user')) || '';
    if ( this.user ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }

  getUser(): UserLogin{
    console.log(this.user);
    
    return this.user;
  }


}
