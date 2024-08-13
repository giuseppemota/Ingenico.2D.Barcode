import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {FormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    MessageModule,
    NgIf,
    InputTextModule,
    ButtonDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    username: "",
    password: ""
  };
  errorMessage = '';

  authService: AuthService;
  router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  onSubmit() {
    this.authService.loginUser(this.loginData.username, this.loginData.password).subscribe({
      next: (response) => {
        // Handle successful login
        this.errorMessage = '';
        this.router.navigate(['/produtos']).then(() => {
          alert('Redirecionado para /produtos com sucesso');
        });
      },
      error: (error) => {
        // Handle login error
        if (error.status === 400) {
          this.errorMessage = 'Bad Request: Verifique os dados fornecidos.';
        } else {
          this.errorMessage = 'Login failed. Please check your username and password.';
        }
        alert('Login failed');
      }
    });
  }
}
