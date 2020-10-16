import { environment } from 'src/environments/environment';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  // public usuario: Usuario;

  constructor(private apollo: Apollo, private httpLink: HttpLink) {}

  logout() {
    localStorage.removeItem('token');
  }

  // crearUsuario(formData: RegisterForm) {
  //   return this.http.post(`${base_url}/usuarios`, formData).pipe(
  //     tap((resp: any) => {
  //       localStorage.setItem('token', resp.token);
  //     })
  //   );
  // }

  // login(formData: LoginForm) {
  //   localStorage.setItem('token', resp.token);
  // }
}
