import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Perfil, ProfileResponse } from 'src/app/models/user-information.model';
import { UserLogin } from 'src/app/models/usuario.model';
import { UserInformationService } from 'src/app/services/user-information.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  perfilForm;
  user: UserLogin;
  showEditForm = false;
  perfilSuscripcion: Subscription;
  perfiles: Perfil[];
  perfilSeleccted: Perfil;
  showDetail = false;
  formProfileVisible = false;

  constructor(
    private perfilService: UserInformationService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.user = this.usuarioService.getUser();
  }

  ngOnInit(): void {
    this.perfilSuscripcion = this.perfilService
      .profileById(this.user.id.toString())
      .subscribe((response: ProfileResponse) => {
        console.log(response);
        this.perfilSeleccted = response.data.profileById;
        this.datosIniciales(this.perfilSeleccted);
      });
  }

  datosIniciales(perfil: Perfil) {
    this.perfilForm = this.fb.group({
      //id:[perfil.id,Validators.required],
      nombre: [perfil.nombre, Validators.required],
      segundoNombre: [perfil.segundoNombre, Validators.required],
      apellido: [perfil.apellido, Validators.required],
      segundoApellido: [perfil.segundoApellido, Validators.required],
      email: [perfil.email, Validators.required],
      ubicacion: [perfil.ubicacion, Validators.required],
      descripcion: [perfil.descripcion, Validators.required],
    });
  }

  enviarPerfil() {
    this.perfilService
      .updateProfile(this.user.id.toString(), this.perfilForm.value)
      .subscribe((response: ProfileResponse) => {
        console.log(response);
        this.toogleForm();
      });
  }

  toogleForm() {
    this.showEditForm = !this.showEditForm;
  }
}
