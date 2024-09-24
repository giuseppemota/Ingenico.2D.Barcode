import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {FormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    MessageModule,
    NgIf,
    InputTextModule,
    ButtonDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginData = {
    username: "",
    password: ""
  };

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    if (this.authService.usuarioLogado()) {
      this.messageService.add({severity: 'info', summary: 'Você já está logado!'});
      this.router.navigate(['/produtos']).then();
    }
  }

  onSubmit() {
    this.authService.loginUser(this.loginData.username, this.loginData.password).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/produtos']).then();
      },
      error: (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessage = error.error.message || 'Email ou Senha inválidos.';
        } else {
          this.errorMessage = 'Verifique o email e a senha fornecidos.';
        }
      }
    });
  }
}
