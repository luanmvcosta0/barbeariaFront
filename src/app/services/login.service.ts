import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth/login";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password:string){
    return this.httpClient.post<LoginResponse>(this.apiUrl+"/login", {email, password}).pipe(
      tap((value)=>{
        sessionStorage.setItem("auth-token",value.token)
        sessionStorage.setItem("username",value.name)
      })
    )
  }

  signup(email: string, password:string){
    return this.httpClient.post<LoginResponse>(this.apiUrl+"/register", {email, password}).pipe(
      tap((value)=>{
        sessionStorage.setItem("auth-token",value.token)
        sessionStorage.setItem("username",value.name)
      })
    )
  }
}