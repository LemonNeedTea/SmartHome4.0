import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsptouchService } from '../../services/esptouch.service';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-wifi-push',
  templateUrl: './wifi-push.page.html',
  styleUrls: ['./wifi-push.page.scss'],
})
export class WifiPushPage implements OnInit {

  queryParams: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private esptouch: EsptouchService,
    private actionSheetController: ActionSheetController,
    private device: DeviceRequestService) {
    this.queryParams = this.route.snapshot.queryParams; // queryParams.wifi queryParams.password
  }
  ngOnInit() {
    this.esptouch.start(this.queryParams.ssid, this.queryParams.password).then((res: any) => {
      let bssidArr: Array<string> = [];
      if (res.length && res.length > 0) {// 返回超过一个设备
      } else if (res) {
        this.addDevice(res.bssid);

      }
    }, err => {
      this.esptouch.close();
      this.presentActionSheet();
    }).catch(res => {
      this.esptouch.close();
      this.presentActionSheet();
    });
  }
  private addDevice(mac: string) {
    this.device.getDeviceInfoBymac(mac, this.queryParams.code).then(res => {
      alert(JSON.stringify(res));
    }, err => {

    });
  }
  ngOnDestroy() {
    this.esptouch.close();
  }
  ionViewWillLeave() {
    return false;
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '配网失败',
      subHeader: '设备连接失败, 请确认网络设置正确。',
      buttons: [{
        text: '再次尝试',
        icon: 'share',
        handler: () => {
          this.ngOnInit();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.router.navigateByUrl('tabs/main');
        }
      }]
    });
    await actionSheet.present();
  }

}
