import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsptouchService } from '../../services/esptouch.service';
import { ToolsService } from '../../services/tools.service';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { ActionSheetController, NavController } from '@ionic/angular';

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
    private device: DeviceRequestService,
    private navCtrl: NavController,
    private tools: ToolsService) {
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
  private async addDevice(mac: string) {
    this.device.getDeviceInfoBymac(mac, this.queryParams.code).then((res: any) => {
      let param = {
        deviceId: res.id,
        name: this.queryParams.name,
        roomId: 1,
        sort: 1,
      };
      alert(JSON.stringify(param));
      this.device.addUserDeviceInfo(param).then((res1: any) => {
      }, err1 => {
        this.tools.showToast('设备添加失败');
      }).finally(() => {
        this.navCtrl.navigateRoot('tabs/main');
      });
      alert(JSON.stringify(res));

    }, err => {
      this.presentActionSheet();
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
          this.navCtrl.navigateRoot('tabs/main');
        }
      }]
    });
    await actionSheet.present();
  }

}
