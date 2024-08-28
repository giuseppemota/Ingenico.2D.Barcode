import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (typeof localStorage !== 'undefined') {
      const expiration = localStorage.getItem('expiration');
      const isAuth =
        expiration !== null && parseInt(expiration, 10) > Date.now();

      if (isAuth) {
        return true;
      }
    }

    alert('Precisa estar logado!');
    return this.router.createUrlTree(['/login']);
  }
}
