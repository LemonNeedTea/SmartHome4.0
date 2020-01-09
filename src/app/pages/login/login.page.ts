import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { LoginRequestService } from '../../services/request/login-request.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string;
  password: string;
  codeSrc: string;
  code: string;


  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor( public rout: Router, public alertController: AlertController,
    private loginRequet: LoginRequestService,
    private tools: ToolsService) {
    this.getCode(); // 获取验证码图片

  }

  login() {
    this.loginRequet.login(this.username, this.password, this.code);
  }

  goRegister() {
    this.rout.navigateByUrl('/register');
  }

  async error(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
  }
  gotoslides() {
    this.rout.navigateByUrl('/');
  }
  getCode() {

    this.loginRequet.getVerificationCode().then((res: any) => {
      this.codeSrc = res.image;
      this.tools.setVerifyToken(res['verifyToken']);
    });
  }

}
