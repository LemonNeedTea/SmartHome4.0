import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

declare var esptouch;

@Injectable({
  providedIn: 'root'
})
export class EsptouchService {
  constructor(private loadingController: LoadingController, private toastController: ToastController) { }

  loading: HTMLIonLoadingElement;
  start(ssid: string, pwd: string) {
    return new Promise((resolve, reject) => {
      esptouch.start(ssid, '00:00:00:00:00:00', pwd, '1', '1',
        res => { resolve(res); },
        err => { reject(err); });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      esptouch.stop(res => {
        resolve(res);
      }, err => { reject(err); });


    });
  }
}
