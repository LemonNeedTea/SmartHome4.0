import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { ToolsService } from './tools.service';
import { ThemeService } from './theme.service';
import { log } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  isLoading = true;
  loader: any;
  constructor(private tools: ToolsService,
              private loading: LoadingController,
              private toastCtrl: ToastController,
              private nav: NavController) {
    axios.defaults.baseURL = 'http://192.168.1.101:8888';
    // 添加响应拦截器
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        // 1.是否加载loading动画
        if (this.isLoading) {
          this.tools.showLoading('Please wait...');
        }
        config.headers.Accept = '*/*';
        config.headers['Content-Type'] = 'application/json';

        const token = this.tools.getToken();
        if (token) {
          config.headers.token = token;
        }
        return config;
      },
      async error => {
        // 请求失败处理
        // this.tools.dismissLoading();
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      async response => {

        // this.tools.dismissLoading();

        const tempData = response.data;
        if (tempData.success) {
          return tempData.data;
        } else {
          // 失败
          this.tools.showToast(tempData.msg);
          if (tempData.code === 5104) {// token失效
            // 1.清除token
            this.tools.cleanToken();
            // 2.弹出确认返回登录框
            this.nav.navigateRoot('/login');

          }
          console.error(tempData);
          return Promise.reject(tempData);
        }
        return response.data;
      },
      async err => {
        // 请求失败处理
        if (err.response.status === 401) {
          this.tools.showToast('非法访问，请重新登录');
            this.nav.navigateRoot('/login');

        }
        return Promise.reject(err);
      }
    );
  }

  async get(url: string, params: any, isLoading = true) {
    this.isLoading = isLoading;
    return axios.get(url, params);
  }
  async getByID(url: string, id: any, isLoading = true) {
    this.isLoading = isLoading;
    return axios.get(url + '/' + id);
  }
  async post(url: string, params: any, isLoading = true) {
    this.isLoading = isLoading;
    return axios.post(url, params);
  }

}
