import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class SocketHelperService {

  constructor(private ws: SocketService,
    private tools: ToolsService) { }

  startSocket() {
    return new Promise((resove, reject) => {
      this.ws.createObservableSocket(this.tools.getToken()).subscribe({
        next: res => this.socketMessageHandle(res),
        complete: () => resove(true),
        error: err => {
          setTimeout(() => {
            this.startSocket();
          }, 5000);
        }
      });
    });

    // Variable.socketObject = this.socket;
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

  }
}