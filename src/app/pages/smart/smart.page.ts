import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceRequestService } from '../../services/request/device-request.service'


@Component({
  selector: 'app-smart',
  templateUrl: './smart.page.html',
  styleUrls: ['./smart.page.scss'],
})
export class SmartPage implements OnInit {
  modeHeight: any;
  modeList = [];

  constructor(public router: Router, public device: DeviceRequestService) { }

  ngOnInit() {
    this.device.getUserModeList().then((res: any) => {
      this.modeList = res.records;
    })

  }
  ionViewDidEnter() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.modeHeight = `${(htmlWidth) / 2.3}px`;
  }
  editMode(mode: any) {
    this.router.navigate(['mode-edit'], { queryParams: mode});
  }




}
