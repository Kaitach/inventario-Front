// socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor() {
    this.socket = io('http://localhost:81');
  }
  listenToEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  // Emitir un evento de confirmación al servidor
  emitConfirmationEvent(data: any) {
    // Puedes personalizar el nombre del evento de confirmación
    this.socket.emit('confirmacion_evento', data);
  }
}

