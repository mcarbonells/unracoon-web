import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Andres', Validators.required],
    email: ['test100@gmai.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  crearUsuario() {
    if (this.registerForm.invalid) {
      return;
    } else {

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
    const pass2 = this.registerForm.get('password2').value;

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
