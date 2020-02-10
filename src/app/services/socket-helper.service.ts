import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ToolsService } from './tools.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SocketHelperService {

  ;

  constructor(private ws: SocketService, private tools: ToolsService, private globalService$: GlobalService) { }

  startSocket() {
    return new Promise((resove, reject) => {
      this.ws.createObservableSocket(this.tools.getToken()).then(res => {
        console.log(res);
        if(res === 'open'){
          this.login();
        }
        this.ws.ws.onmessage = (event) => {
          try {
            // console.log(event.data);
            this.socketMessageHandle(JSON.parse(event.data));
          } catch (err) {
            console.log(err);
          }
        } ;
        resove(true);

      }, err => {
        console.log('socket start error');
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
      this.globalService$.DeviceData[data.mac] = data.data;

      this.globalService$.globalVar.next(data);
    } else if (type === 'set') {
      if(!data.success){
        this.tools.showToast(data.msg);
        this.tools.dismissLoading();
      }
    } else if (type === 'login') {

    } else if (type === 'logout') {

    } else {

    }

  }
  sendMessage(data: any) {
    data.token = this.tools.getToken();
    this.ws.sendMessage(data);
  }
}