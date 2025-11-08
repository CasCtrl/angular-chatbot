import { Component } from '@angular/core';
import { ChatbotFabComponent } from './chatbot-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatbotFabComponent],
  template: `
    <h1 style="padding:16px">Internal Chatbot Prototype</h1>
    <p style="padding:0 16px 16px">FAB chatbot demo using Socket.io + Chart.js</p>
    <app-chatbot-fab></app-chatbot-fab>
  `
})
export class App {}
