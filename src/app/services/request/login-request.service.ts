import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import { ToolsService } from '../tools.service';
import { ServicesService } from '../services.service';
import { NavController } from '@ionic/angular';
import { SocketHelperService } from '../../services/socket-helper.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestService {

  constructor(private axiosHttp: AxiosService,
    private tools: ToolsService,
    private services: ServicesService,
    private nav: NavController,
    private socketHelper: SocketHelperService) { }
  /**
   * 获取登录验证码图片数据
   */
  getVerificationCode() {
    return this.axiosHttp.get('/verificationCode/getBase64Image', {}, false);
  }
  /**
   * 登录
   * @param username 用户名
   * @param pwd 密码
   * @param code 验证码
   */
  login(username: string, pwd: string, code: string) {
    return this.axiosHttp.post('/login', {
      'code': code,
      'password': pwd,
      'username': username,
      'verifyToken': this.tools.getVerifyToken()
    }).then((res: any) => {
      // 成功保存token
      this.tools.setToken(res.token);
      // this.services.goto('/tabs/main');
      this.tools.setUserName(username);
      this.nav.navigateRoot('/tabs/main');
      this.socketHelper.login();
    }).catch(err => {
      console.log(err);
    });
  }
  checkToken() {
    return this.axiosHttp.post('/checkToken', {});
  }
  async logout() {
    return await this.axiosHttp.post('/logout', {}).then(res => {
      this.tools.logoutCleanStorage();
      this.socketHelper.logout();
      this.tools.cleanUserName();
    });
  }

  async register(username, password) {
    return await this.axiosHttp.post('/sysUser/add', {
      "departmentId": 1,
      "gender": 1,
      "head": "string",
      "password": password,
      "phone": "13016978120",
      "remark": "string",
      "roleId": 1,
      "salt": "1122",
      "state": 1,
      "username": username
    });

  }
}
