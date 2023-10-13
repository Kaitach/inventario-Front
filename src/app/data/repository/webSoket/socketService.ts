// socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
   soketIO = window._env.SOCKETIO_API_URI;
  constructor() {
    this.socket = io(`ws://${this.soketIO}`);
  }
  listenToEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  emitConfirmationEvent(data: any) {
    this.socket.emit('confirmacion_evento', data);
  }
}

