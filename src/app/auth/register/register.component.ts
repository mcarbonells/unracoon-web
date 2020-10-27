import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserInformationService } from 'src/app/services/user-information.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password_confirmation')
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private userInformationService: UserInformationService,
    public router: Router,
  ) {
  }

  async crearUsuario(){
    if (this.registerForm.invalid) {
      return;
    } else {
      await this.usuarioService.registerUser(this.registerForm.value).then((response) => {
          console.log(response);
      }).catch((error) => {
          alert(`No se pudo registrar el usuario ${error}`);
          return;
      });
      await this.userInformationService.createProfile(this.registerForm.value).then((response) => {
        console.log(response);
      });
      this.router.navigate(['/login']);
    }
  }

  campoNoValido( campo: string ): boolean {
    if ( this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  constrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password_confirmation').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true});
      }
    };
  }

  ngOnInit(): void {
  }

}
