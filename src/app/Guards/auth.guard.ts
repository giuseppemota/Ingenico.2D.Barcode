import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
        const expiration = localStorage.getItem('expiration');
        const isAuth = expiration !== null && parseInt(expiration) <= Date.now() ? true : false;
        if (isAuth) {
          return true;
        }
        alert('Precisa estar logado!');
        return this.router.createUrlTree(['/login']);
  }
}
