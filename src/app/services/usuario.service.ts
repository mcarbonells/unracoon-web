import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {


  constructor(private apollo: Apollo) {}


}
