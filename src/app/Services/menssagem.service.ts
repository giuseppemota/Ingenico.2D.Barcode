import { Injectable } from '@angular/core';
import {Message, MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MenssagemService {

  constructor(private messageService: MessageService) { }

  messagemErro(message: Message) {
    this.messageService.add(message);
  }
}
