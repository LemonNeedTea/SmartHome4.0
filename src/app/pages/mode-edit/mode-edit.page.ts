import { Component, OnInit } from '@angular/core';
import { DeviceRequestService } from '../../services/request/device-request.service'

@Component({
  selector: 'app-mode-edit',
  templateUrl: './mode-edit.page.html',
  styleUrls: ['./mode-edit.page.scss'],
})
export class ModeEditPage implements OnInit {
  urlImage: string;
  deviceList=[];
  constructor(public device: DeviceRequestService) {
    this.urlImage = 'http://localhost:24310//resource/202003031633372.jpeg';
   }

  ngOnInit() {
    this.device.getDeviceDetailList().then((res: any) => {
      this.deviceList = res;
      console.log(this.deviceList);
    });
  }

  onUpload(e) {
    var formData = new FormData();
    formData.append("img",e.target.files[0]);
    this.device.upload(formData).then((res: any)=>{

      this.urlImage = res;
    });

  }
  save() {
    alert('save');
  }

}
