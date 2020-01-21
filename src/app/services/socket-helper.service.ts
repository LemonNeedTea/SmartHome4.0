import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ToolsService } from './tools.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SocketHelperService {

  constructor(private ws: SocketService,
    private tools: ToolsService) { }

  startSocket() {
    return new Promise((resove, reject) => {
      this.ws.createObservableSocket(this.tools.getToken()).then(res => {
        console.log(res);
        this.ws.ws.onmessage = (event) => {
          this.socketMessageHandle(JSON.parse(event.data));
        };
        resove(true);

      }, err => {
        console.log('error');
        setTimeout(() => {
          this.startSocket();
        }, 5000);
      });
    });
  }

  login() {
    // 登录
    const data = {
      type: 'login',
      token: this.tools.getToken()
    };
    this.ws.sendMessage(data);
  }
  logout() {
    // 登录
    const data = {
      type: 'logout',
      token: this.tools.getToken()
    };
    this.ws.sendMessage(data);
  }
  closeSocket() {
    this.ws.ws.close();
    this.ws.ws = null;

  }
  socketMessageHandle(data) {
    console.log(data);
    if (!data || !data.type) { return; }
    const type = data.type;
    if (type === 'get') {

    } else if (type === 'set') {

    } else if (type === 'login') {

    } else if (type === 'logout') {

    } else {

    }

  }
}