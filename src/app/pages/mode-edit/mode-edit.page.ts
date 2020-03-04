import { Component, OnInit } from '@angular/core';
import { DeviceRequestService } from '../../services/request/device-request.service'
import { ToolsService } from '../../services/tools.service';
import UserMode from '../../models/UserMode';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mode-edit',
  templateUrl: './mode-edit.page.html',
  styleUrls: ['./mode-edit.page.scss'],
})
export class ModeEditPage implements OnInit {
  urlImage: string;
  deviceList = [];
  name: string;
  constructor(public device: DeviceRequestService, public tools: ToolsService, public router: Router, public params: ActivatedRoute,public nav: NavController) {
    this.urlImage = 'http://localhost:24310//resource/app/mode/con-mode-getup.png';
  }

  ngOnInit() {
    this.device.getDeviceDetailList().then((res: any) => {
      this.deviceList = res;
      console.log(this.deviceList);
    });
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
      let userMode={
        name: this.name,
        selected:false,
        img: this.urlImage,
        userId: 1
      };

      let userModeDetailList = [];
      this.deviceList.map((item: any, index: number) => {
        userModeDetailList.push({
          "deviceId": item.id,
          "paramCode": 'switch_state',
          "paramValue": item.mode_setting ? true : false
        })
      });
      this.device.addUserModeAndDetail({ userMode, userModeDetailList }).then(res => {
        // this.router.navigateByUrl('/tabs/smart');
        this.nav.back();
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

}
