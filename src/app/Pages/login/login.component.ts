import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {FormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";

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

  onSubmit() {}
}
