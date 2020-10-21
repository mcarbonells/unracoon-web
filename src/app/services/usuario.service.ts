import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { User } from '../models/usuario.model';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {


  constructor(private apollo: Apollo) {}

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
          password: ${user.password},
          password_confirmation: ${user.password_confirmation},
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
          password: ${user.password},
        }) {
          id
        
        }
      }
      `,
    });
  }


}
