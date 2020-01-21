import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';

// import { WebSocketAPI } from './common/WebSocket';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // webSocketAPI: WebSocketAPI;
  // greeting: any;
  // name: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private theme: ThemeService
  ) {
    this.initializeApp();
    this.theme.initTheme();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  // ngOnInit() {
  //   this.webSocketAPI = new WebSocketAPI();
  // }

  // connect() {
  //   this.webSocketAPI._connect();
  // }

  // disconnect() {
  //   this.webSocketAPI._disconnect();
  // }

  // sendMessage() {
  //   this.webSocketAPI._send(this.name);
  // }

  // handleMessage(message) {
  //   this.greeting = message;
  //   console.log(message);
  // }
}
