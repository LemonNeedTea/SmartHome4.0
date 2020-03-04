import { Component, OnInit } from '@angular/core';
import { DeviceRequestService } from '../../services/request/device-request.service'
import { ToolsService } from '../../services/tools.service';
import UserMode from '../../models/UserMode';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mode-edit',
  templateUrl: './mode-edit.page.html',
  styleUrls: ['./mode-edit.page.scss'],
})
export class ModeEditPage implements OnInit {
  urlImage: string;
  deviceList = [];
  name: string;
  queryParams: any;
  title: string;
  isEdit: boolean = false;
  constructor(public device: DeviceRequestService, public tools: ToolsService, public router: Router, public route: ActivatedRoute, public nav: NavController, public alertController: AlertController) {
    this.queryParams = this.route.snapshot.queryParams;

    console.log(this.queryParams);

    if (this.queryParams.id) {
      this.title = '编辑模式';
      this.name = this.queryParams.name;
      this.urlImage = this.queryParams.img;
      this.isEdit = true;
    } else {
      this.title = '新增模式';
      this.urlImage = 'http://218.206.104.2:24310//resource/app/mode/con-mode-getup.png';
    }


  }

  async ngOnInit() {
    await this.device.getDeviceDetailList().then((res: any) => {
      this.deviceList = res;
      console.log(this.deviceList);
    });

    if (this.isEdit) {
      await this.device.getUserModeDetailList(this.queryParams.id).then((res: any) => {
        res.map((item: any, index: number) => {
          this.deviceList.map((device: any) => {
            if (device.id === item.deviceId) {
              device.mode_setting = item.paramValue == '0' ? false : true;
              device.detail_id = item.id;
            }
          })
        })
      })
    }

  }

  onUpload(e) {
    var formData = new FormData();
    formData.append("img", e.target.files[0]);
    this.device.upload(formData).then((res: any) => {

      this.urlImage = res;
    });

  }
  save() {
    if (this.checkParam()) {
      let userMode = {
        name: this.name,
        selected: false,
        img: this.urlImage,
      };

      if (this.isEdit) {
        userMode['id'] = this.queryParams.id;
        userMode['userId'] = this.queryParams.userId;
        userMode.selected = this.queryParams.selected;
      }

      let userModeDetailList = [];
      this.deviceList.map((item: any, index: number) => {
        let temp = {
          "deviceId": item.id,
          "paramCode": 'switch_state',
          "paramValue": item.mode_setting ? 1 : 0
        };
        if (this.isEdit) {
          temp['id'] = item.detail_id;
          temp['modeId'] = this.queryParams.id ;
        }
        userModeDetailList.push(temp);
      });
      this.device.addUserModeAndDetail({ userMode, userModeDetailList,edit: this.isEdit }).then(res => {
        this.router.navigateByUrl('/tabs/smart').then(res => {
          location.reload();
        });
        // this.nav.back();
      })
    }
  }
  checkParam(): boolean {

    if (!this.name) {
      this.tools.showToast('请输入模式名称');
      return false;
    }

    return true;
  }

  async delete() {
    const alert = await this.alertController.create({
      header: '确认',
      message: '<strong>删除模式？</strong>',
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
            console.log('Confirm Okay');
            this.device.deleteMode(this.queryParams.id).then(res => {
              this.nav.navigateRoot(['tabs/smart']).then(res => {
                location.reload();
              });
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
