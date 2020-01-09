import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import {ToolsService} from '../tools.service';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestService {

  constructor(private axiosHttp: AxiosService,
    private tools: ToolsService,
    private services: ServicesService) { }
  /**
   * 获取登录验证码图片数据
   */
  getVerificationCode() {
    return this.axiosHttp.get('/verificationCode/getBase64Image', false);
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
      this.services.goto('/tabs/main');
    }).catch(err => {
      console.log(err) ;
    });
  }
  checkToken() {
    return this.axiosHttp.post('/checkToken', {});
  }
  async logout() {
    return await this.axiosHttp.post('/logout', {}).then(res => {
      this.tools.logoutCleanStorage();
    });
  }
}
