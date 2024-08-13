import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url_signup = '';
  url_login = '';
  usuario = new BehaviorSubject<User>(new User('', '', '', new Date()));

  constructor(private http: HttpClient) {}

  signupUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.url_signup, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          const expiracaoData = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const usuario = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );

          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.url_login, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          const expiracaoData = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const usuario = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );
          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        })
      );
  }

  logout() {
    this.usuario.next(new User('', '', '', new Date()));
  }
}
