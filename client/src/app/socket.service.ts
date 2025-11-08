import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket = io('http://localhost:8081', { transports: ['websocket'] });

  requestPositions(userId = 'demo-user') {
    this.socket.emit('get_positions', userId);
  }

  onPositions(callback: (positions: Record<string, number>) => void) {
    this.socket.on('positions', callback);
  }
}
