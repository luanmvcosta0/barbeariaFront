import { LoginService } from './../../sevices/login.service';
import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  toastService: any;

    constructor(
      private router : Router,
      private LoginService: LoginService
    ){
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      })
    }

    submit() {
        this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
          next: () => this.toastService.success("Login feito com sucesso!"),
          error: () => this.toastService.console.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

    navigate(){
      this.router.navigate(["signup"])
    }
}