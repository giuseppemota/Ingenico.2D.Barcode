import {Component,} from '@angular/core';
import {Button} from "primeng/button";
import {AuthService} from "../../Services/auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Button,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{
  authService: AuthService;

  constructor(authService: AuthService, protected router: Router) {
    this.authService = authService;
  }

  encerrarSessao() {
    this.authService.logout();
  }

  get usuarioLogado() {
    return this.authService.usuarioLogado();
  }
}
