import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Perfil} from '../models/user-information.model';

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

  profileById() {
    return this.apollo.query({
      query: gql`
        {
          profileById(id:1){
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

  createProfile(perfil: Perfil) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        createProfile(perfil:{
          nombre:"${perfil.nombre}",
          segundoNombre:"${perfil.segundoNombre}",
          apellido:"${perfil.apellido}",
          segundoApellido:"${perfil.segundoApellido}",
          email:"${perfil.email}",
          constrasena:"${perfil.constrasena}",
          ubicacion:"${perfil.ubicacion}",
          descripcion:"${perfil.descripcion}"    
        })
      }
      `
    });
  }

  updateProfile(id: string,perfil: Perfil) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        updateProfile(id:${id},perfil:{
          nombre:"${perfil.nombre}",
          apellido:"${perfil.apellido}",
          email:"${perfil.email}",
          descripcion:"${perfil.descripcion}"    
        })
      }
      `
    });

   /* return this.apollo.mutate({
      mutation: gql`
      mutation{
        updateProfile(id:${id},perfil:{
          nombre:"${perfil.nombre}",
          segundoNombre:"${perfil.segundoNombre}",
          apellido:"${perfil.apellido}",
          segundoApellido:"${perfil.segundoApellido}",
          email:"${perfil.email}",
          constrasena:"${perfil.constrasena}",
          ubicacion:"${perfil.ubicacion}",
          descripcion:"${perfil.descripcion}"    
        })
      }
      `
    });*/
  }

  updateProfilePassword(id: string,perfil: Perfil) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        updateProfilePassword(id:${id},perfil:{
          constrasena:"${perfil.constrasena}"
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
