import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigConst } from '../common/confg-const';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  ws: WebSocket;
  interval: any;
  loading: any;
  constructor() {

  }
  createObservableSocket(token: string): Observable<any> {

    return new Observable<any>(
      observable => {
        if (!token) { return observable.error(); }
        if (this.ws) {
          this.ws.close();
          this.ws = null;
        }
        this.ws = new WebSocket(ConfigConst.SOCKET_URL);
        this.ws.onopen = d => {
         observable.complete();
        };
        this.ws.onmessage = (event) => observable.next(JSON.parse(event.data));
        this.ws.onerror = (event) => {
          observable.error(event);
        };
        this.ws.onclose = (event) => {
          observable.error('');
        };
      }
    )
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
