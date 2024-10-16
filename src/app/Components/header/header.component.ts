import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {AuthService} from "../../Services/auth.service";
import {NgIf} from "@angular/common";
import {routes} from "../../app.routes";
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
export class HeaderComponent {
  authService: AuthService;
  currentRoute: string;

  constructor(authService: AuthService, private router: Router) {
    this.authService = authService;
    this.currentRoute = '';
  }

  ngOnInit() {
    this.router.events.subscribe((() => {
      this.currentRoute = this.router.url;
    }))
  }

  encerrarSessao() {
    this.authService.logout();
  }

  get usuarioLogado() {
    return this.authService.usuarioLogado();
  }

  get shouldShowLogoutButton(){
    return this.usuarioLogado &&
      this.currentRoute !== '/leitor-qrcode'
  }

  protected readonly routes = routes;
}
