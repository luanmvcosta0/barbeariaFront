import { provideToastr } from 'ngx-toastr';
import { LoginService } from './../../sevices/login.service';
import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;
  toastService: any;

    constructor(
      private router : Router,
      private LoginService: LoginService
    ){
      this. signupForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3),]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
         passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6),])
        })
    }

    submit() {
        this.LoginService.signup(this. signupForm.value.name, this. signupForm.value.email).subscribe({
          next: () => this.toastService.success("Login feito com sucesso!"),
          error: () => this.toastService.console.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

    navigate(){
      this.router.navigate(["login"])
    }
}