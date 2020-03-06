import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { GlobalService } from '../../services/global.service';
import { Variable } from '../../common/variable';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.page.html',
  styleUrls: ['./smart.page.scss'],
})
export class SmartPage implements OnInit {
  modeHeight: any;
  modeList = [];

  constructor(public router: Router, public device: DeviceRequestService, private tools: ToolsService,
    private globalService$: GlobalService) { }

  ngOnInit() {
    this.initData();
  }
  initData() {
    this.device.getUserModeList().then((res: any) => {
      this.modeList = res.records;
    })
  }
  ionViewDidEnter() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.modeHeight = `${(htmlWidth) / 2.3}px`;
  }
  editMode(mode: any) {
    this.router.navigate(['mode-edit'], { queryParams: mode });
  }

  setMode(mode: any) {



    
    this.tools.presentConfirm(`执行${mode.name}?`).then(res => {
          const params = {
      type: 'setmode',
      set: {
        // code:'mode_set',
        value: [mode.id]
      }
    };
    Variable.socketObject.sendMessage(params);
      // 1.设置模式
      this.device.updateUserModeSelected(mode.id).then(res => {
        //重新获取模式列表
        this.initData();
      });

    })

  }




}
