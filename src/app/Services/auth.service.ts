import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponseData {
  token: string;
  expiration: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // url_signup = 'http://localhost:5013/v1/Auth';
  url_login = 'http://localhost:5013/v1/Auth/Login';
  usuario = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // signupUser(email: string, password: string) {
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + localStorage.getItem('token')
  //   });
  //
  //   return this.http
  //     .post<{ success: boolean }>(
  //       this.url_signup,
  //       {
  //         email: email,
  //         password: password
  //       },
  //       { headers }
  //     )
  //     .pipe(
  //       tap((resData) => {
  //         if (resData.success) {
  //           this.router.navigate(['/login']);
  //         } else {
  //           this.router.navigate(['/login']);
  //         }
  //       })
  //     );
  // }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.url_login, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resData) => {
          localStorage.setItem('token', resData.token);
          localStorage.setItem('expiration', resData.expiration.toString());
        })
      );
  }

  logout() {
    this.usuario.next(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
    }
    this.router.navigate(['/login']);
  }

  usuarioLogado(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;
  }
}
