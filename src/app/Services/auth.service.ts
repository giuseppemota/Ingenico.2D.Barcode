import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, tap } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";

// interface AuthResponseDataToken {
//   email: string;
//   localId: string;
//   idToken: string;
//   expiresIn: string;
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url_signup = 'http://localhost:5013/v1/Auth';
  url_login = 'http://localhost:5013/v1/Auth/Login';
  usuario = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // signupUser(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(this.url_signup, {
  //       email: email,
  //       password: password,
  //     })
  //     .pipe(
  //       tap((resData) => {
  //         const expiracaoData = new Date(
  //           new Date().getTime() + +resData.expiresIn * 1000
  //         );
  //         const usuario = new User(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           expiracaoData
  //         );
  //
  //         this.usuario.next(usuario);
  //         localStorage.setItem('userData', JSON.stringify(usuario));
  //       })
  //     );
  // }

  // loginUser(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseDataToken>(this.url_login, {
  //       email: email,
  //       password: password,
  //     }).pipe(
  //       tap((resData) => {
  //         const expiracaoData = new Date(
  //           new Date().getTime() + +resData.expiresIn * 1000
  //         );
  //         const usuario = new User(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           expiracaoData
  //         );
  //         this.usuario.next(usuario);
  //         localStorage.setItem('userData', JSON.stringify(usuario));
  //       })
  //     );
  // }

  signupUser(email: string, password: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http
      .post<{ success: boolean }>(
        this.url_signup,
        {
          email: email,
          password: password
        },
        { headers }
      )
      .pipe(
        tap((resData) => {
          if (resData.success) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/login']);
          }
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<{ token: string, expiration: Date }>(this.url_login, {
        email: email,
        password: password,
      }).pipe(
        tap((resData) => {
          localStorage.setItem('token', resData.token);
        })
      );
  }

  logout() {
    this.usuario.next(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
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
