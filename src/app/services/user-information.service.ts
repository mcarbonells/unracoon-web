import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Perfil} from '../models/user-information.model';
import { User } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private apollo: Apollo) { }


  allPerfiles() {
    return this.apollo.query({
      query: gql`
        {
          allPerfiles{
            nombre
            segundoNombre
            apellido
            segundoApellido
            email
            estado
            ubicacion
            descripcion            
          }
        }
      `,
    });
  }

  profileById(id:string) {
    return this.apollo.query({
      query: gql`
        {
          profileById(id:${id}){
            nombre
            segundoNombre
            apellido
            segundoApellido
            email
            ubicacion
            descripcion
          }
        }
      `,
    });
  }

  createProfile(perfil: User) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        createProfile(perfil:{
          nombre:"${perfil.name}",
          email:"${perfil.email}",
          constrasena:"${perfil.password}",
        })
      }
      `
    }).toPromise();
  }

  updateProfile(id: string,perfil: Perfil) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        updateProfile(id:${id},perfil:{
          nombre:"${perfil.nombre}",
          segundoNombre:"${perfil.segundoNombre}",
          apellido:"${perfil.apellido}",
          segundoApellido:"${perfil.segundoApellido}",
          descripcion:"${perfil.descripcion}",
          ubicacion:"${perfil.ubicacion}"
        })
      }
      `
    });

  }

  updateProfilePassword(id: string,perfil: Perfil) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        updateProfilePassword(id:${id},perfil:{
          constrasena:"${perfil.password}"
        })
      }
      `
    });
  }

  deleteProfile(id: string) {
    return this.apollo.mutate({
      mutation: gql`
      deleteProfile(id:${id},perfil:{
        estado:false
      })
      `
    });
  }

}
