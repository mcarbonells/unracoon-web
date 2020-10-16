import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// import { UsuarioService } from 'src/app/services/usuario.service';


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
    remember: [false]
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
  }



  attachSignin(element) {}
}
