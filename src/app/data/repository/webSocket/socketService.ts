import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;

  constructor() {
    this.socket = io(`ws://${environment.HOST_81}`);
  }
  listenToEvent(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }

  emitConfirmationEvent(data: any) {
    this.socket.emit('confirm_evento', data);
  }
}
