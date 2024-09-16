import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {MenssagemService} from "../Services/menssagem.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private messageService: MenssagemService) {
  }

  canActivate(): boolean | UrlTree {
    if (typeof localStorage !== 'undefined') {
      const expiration = localStorage.getItem('expiration');
      const isAuth = expiration !== null && parseInt(expiration) <= Date.now();
      if (isAuth) {
        return true;
      } else {
        this.messageService.messagemErro({
          detail: "Você precisa estar logado para acessar essa página.",
          severity: "info ",
          summary: "Atenção"
        });
        return this.router.createUrlTree(['/login']);
      }
    }

    return this.router.createUrlTree(['/login']);
  }
}
