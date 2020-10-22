import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';



declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || null, [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public router: Router,
  ) {if (this.usuarioService.validarUser()) {
    this.router.navigate(['/learn']);
  } }


  ngOnInit(): void {
  }

  async login() {
    await this.usuarioService.loginUser(this.loginForm.value).catch((err) => {
      alert('Datos invalidos');
      return;
    });
    this.router.navigate(['/learn']);
  }

}
