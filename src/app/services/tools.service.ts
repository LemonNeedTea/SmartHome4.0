import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import * as Moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private storage: StorageService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertController: AlertController) { }
  setToken(token: string) {
    this.storage.set('token', token);
  }
  getToken() {
    try {
      return this.storage.get('token');
    } catch (err) {
      return null;
    }
  }
  cleanToken() {
    this.storage.remove('token');
  }
  setUserName(username: string) {
    this.storage.set('smarthome4.0-username', username);
  }
  getUserName() {
    try {
      return this.storage.get('smarthome4.0-username');
    } catch (err) {
      return null;
    }
  }
  cleanUserName() {
    this.storage.remove('smarthome4.0-username');
  }
  setVerifyToken(token: string) {
    this.storage.set('verify-token', token);
  }
  getVerifyToken() {
    try {
      return this.storage.get('verify-token');
    } catch (err) {
      return null;
    }
  }

  async showLoading(message: string) {
    const loader = await this.loadingCtrl.create({
      message,
      duration: 30000
    });
    await loader.present().then(res => {
      //  console.log('present');

    });
  }
  async dismissLoading() {
    // console.log('dismiss');
    await this.loadingCtrl.dismiss();
  }
  /**˝
 // tslint:disable-next-line: jsdoc-format
 * Toast全局提示
 */
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,  // 默认展示的时长
      position: 'top'
    });
    await toast.present();
    return toast;
  }
  async logoutCleanStorage() {
    await this.storage.remove('token');
    await this.storage.remove('verify-token');
  }
  parseToBooleanByString(data: string): boolean {
    if (parseInt(data)) {
      let n = parseInt(data);
      if (n == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  /**
 * 将小时、分钟转换成字符串 00:00
 * @param hour 
 * @param minute 
 */
  getTime(hour: string, minute: string) {
    let str = `${hour ? hour : 0}: ${minute ? minute : 0}`
    return Moment(str, "HH:mm").format("HH:mm");
  }

  padStart(data: string, num: number, str: string): string {
    if (data.length >= num) return data;
    let num1 = num - data.length;
    let addStr = '';
    for (let i = 0; i < num1; i++) {
      addStr += '0';
    }
    return addStr += data;
  }
  getNumberByArr(data: any) {
    let result: number = 0;
    if (!data) return result;
    let temp = [];
    temp[0] = data[0];
    temp[1] = data[6];
    temp[2] = data[5];
    temp[3] = data[4];
    temp[4] = data[3];
    temp[5] = data[2];
    temp[6] = data[1];
    let length = temp.length;
    for (let index = 0; index < length; index++) {
      const element = temp[index];
      if (element >= 1) {
        result += Math.pow(2, length - 1 - index);
      }

    }
    return result;
  }
  getSendControl(data: any, strLength = 18) {
    let num = 0;
    let arr = new Array();
    for (const item in data) {
      let temp = data[item];
      if (temp instanceof Array) {
        temp.forEach(ele => {
          arr.push(ele);
        });
      }
      else {
        if (!Number(temp)) {
          temp = 0;
        }
        arr.push(temp);
      }
    }
    return arr;

  }

  async presentConfirm(message: string): Promise<any> {

    return new Promise(async (reject, resove) => {
      const alert = await this.alertController.create({
        header: '确认',
        message: `<strong>${message}</strong>`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              reject(true);
            }
          }
        ]
      });

      await alert.present();
    });


  }
}
