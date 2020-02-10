import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { ConfigConst } from '../common/confg-const';
// import { SocketHelperService } from './socket-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  ws: WebSocket;
  interval: any;
  loading: any;
  constructor(
    // private helper: SocketHelperService
    ) {

  }
  createObservableSocket(token: string) {
    return new Promise(
      (resolve, reject) => {
        if (!token) { return reject(); }
        if (this.ws) {
          this.ws.close();
          console.log('closeing----');

          this.ws = null;
        }
        this.ws = new WebSocket(ConfigConst.SOCKET_URL);
        this.ws.onopen = d => {
          resolve('open');
          
        };
        this.ws.onerror = (event) => {
          reject(event);
          console.log(event);

        };
        this.ws.onclose = (event) => {
          reject('');
          console.log('closed');
        };
      }
    )
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
