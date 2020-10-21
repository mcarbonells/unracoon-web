import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Perfil,ProfileResponse  } from 'src/app/models/user-information.model';
import { UserInformationService } from 'src/app/services/user-information.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm;
  showEditForm = false;
  perfilSuscripcion: Subscription;
  perfiles: Perfil[];
  perfilSeleccted: Perfil;
  showDetail = false;
  formProfileVisible = false;

  constructor(private perfilService: UserInformationService,private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.perfilSuscripcion = this.perfilService.profileById().subscribe((response: ProfileResponse) => {
      console.log(response);      
      this.perfilSeleccted = response.data.profileById;
      this.datosIniciales(this.perfilSeleccted);
    });
  }

  datosIniciales(perfil:Perfil){
    this.perfilForm = this.fb.group({
      nombre: [perfil.nombre, Validators.required],
      segundoNombre: [perfil.segundoNombre, Validators.required],
      apellido: [perfil.apellido, Validators.required],
      segundoApellido: [perfil.segundoApellido, Validators.required],
      email: [perfil.email, Validators.required],
      ubicacion: [perfil.ubicacion, Validators.required],
      descripcion: [perfil.descripcion, Validators.required],
    });
  }

  enviarPerfil(){    
    this.perfilService.updateProfile("1",this.perfilForm.value).subscribe((response: ProfileResponse) => {
    console.log(response);
    this.toogleForm();
    });
  }

  toogleForm(){
    this.showEditForm = !this.showEditForm;
  }
}

