import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { PositionsChartComponent } from './positions-chart.component';

@Component({
  selector: 'app-chatbot-fab',
  standalone: true,
  imports: [CommonModule, FormsModule, PositionsChartComponent],
  template: `
    <button class="fab" (click)="toggle()">💬</button>
    <section class="panel" *ngIf="open()">
      <header class="header">Assistant</header>
      <main class="body">
        <div *ngFor="let m of msgs()">
          <div [class.user]="m.from==='user'" class="bubble">{{ m.text }}</div>
        </div>
        <app-positions-chart *ngIf="positions" [positions]="positions"></app-positions-chart>
      </main>
      <form (ngSubmit)="send()">
        <input [(ngModel)]="draft" name="draft" placeholder='Ask me "show me my positions"'>
        <button>Send</button>
      </form>
    </section>
  `,
  styles: [`
    .fab{position:fixed;bottom:24px;right:24px;background:#125B50;color:#fff;border:none;
         border-radius:50%;width:56px;height:56px;font-size:24px;cursor:pointer}
    .panel{position:fixed;bottom:90px;right:20px;width:340px;background:#fff;
           border:1px solid #ddd;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.2);
           display:flex;flex-direction:column}
    .header{padding:10px 12px;font-weight:600;background:#f6f6f6;border-bottom:1px solid #ddd}
    .body{padding:10px;flex:1;overflow:auto}
    .bubble{margin:5px 0;padding:8px 10px;border-radius:8px;background:#e8f0fe;width:fit-content}
    .user{align-self:flex-end;background:#125B50;color:#fff}
    form{display:flex;padding:8px;border-top:1px solid #eee}
    input{flex:1;padding:6px 8px;border:1px solid #ccc;border-radius:8px;margin-right:6px}
  `]
})
export class ChatbotFabComponent {
  open = signal(false);
  draft = '';
  msgs = signal([{ from: 'bot', text: 'Hi! Ask me “show me my positions”.' }]);
  positions: Record<string, number> | null = null;

  constructor(private socket: SocketService) {
    this.socket.onPositions(p => {
      this.positions = p;
      this.msgs.update(arr => [...arr, { from: 'bot', text: 'Here’s your portfolio allocation.' }]);
    });
  }

  toggle() { this.open.update(v => !v); }

  send() {
    const text = this.draft.trim();
    if (!text) return;
    this.msgs.update(arr => [...arr, { from: 'user', text }]);
    this.draft = '';

    if (/show me my positions/i.test(text)) {
      this.socket.requestPositions();
      this.msgs.update(arr => [...arr, { from: 'bot', text: 'Fetching your positions…' }]);
    } else {
      this.msgs.update(arr => [...arr, { from: 'bot', text: 'Try asking about your positions.' }]);
    }
  }
}
