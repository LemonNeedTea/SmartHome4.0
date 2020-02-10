
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { LoginRequestService } from '../../services/request/login-request.service';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { SocketHelperService } from '../../services/socket-helper.service';
import { ToastController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
import { GlobalService } from '../../services/global.service';
import { ToolsService } from '../../services/tools.service';
import { log } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


  item: any;
  id: string;
  forceOverscroll = true;

  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';
  deviceList = [];
  deviceDataSubscribe: any;
  constructor(private router: Router,
    public services: ServicesService,
    private login: LoginRequestService,
    private dragulaService: DragulaService,
    private toastController: ToastController,
    private device: DeviceRequestService,
    private socketHelper: SocketHelperService,
    private globalService$: GlobalService,
    private tools: ToolsService,  
    private route: ActivatedRoute,) {
    // const queryParams = this.route.snapshot.queryParams; // queryParams.wifi queryParams.password
    this.dragulaService.drag('bag')
      .subscribe(({ name, el, source }) => {// 拖动开始
        console.log('drag');
        this.forceOverscroll = false;
      });

    this.dragulaService.removeModel('bag')
      .subscribe(({ item }) => {
        this.toastController.create({
          message: 'Removed: ' + item.value,
          duration: 2000
        }).then(toast => toast.present());
      });

    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        item['color'] = 'success';
      });

    this.dragulaService.over('bag').subscribe((value) => {
      console.log('voer');

    });

    this.dragulaService.out('bag').subscribe((value) => {// 拖动结束
      console.log('out');
      this.forceOverscroll = true;


    });

    // this.dragulaService.createGroup('bag', {
    //   removeOnSpill: true
    // });
  }

  ngOnInit() {
    console.warn('ngOnInit')
    this.logued();
    this.device.getDeviceDetailList().then((res: any) => {
      this.deviceList = res;
      this.initData();
    });

  }
  ionViewDidEnter(){
    // this.fresh();
    console.log('ionViewDidEnter');

  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }
  fresh() {
    this.device.getDeviceDetailList().then((res: any) => {
      this.deviceList = res;
    });
  }

  initData() {
    // 设备实时数据接收
    this.initDeviceData();
    this.deviceDataSubscribe = this.globalService$.globalVar.subscribe((res: any) => {
      this.initDeviceData();
    });
  }
  initDeviceData() {
    const deviceDatas = this.globalService$.DeviceData;
    if (!deviceDatas) {
      return;
    }
    this.deviceList.forEach(res => {
      if (deviceDatas[res.mac]) {
        res.open = this.tools.parseToBooleanByString(deviceDatas[res.mac].switch_state);
      }
    })

  }



  logued() {
    // this.login.checkToken();
  }

  async signOut() {
    // const res = await this.aut.auth.signOut();
    // console.log(res);
    // this.router.navigateByUrl('/login');
  }

  async getProfile(id) {
    // await this.services.getProfile(id).subscribe((data: any) => {
    //   if (data.length === 0) {
    //     console.log('profile empty');
    //     this.router.navigateByUrl(`edit-profile`);
    //   } else {
    //     console.log('Profile not empty');
    //     console.log(data);
    //     this.item = data;
    //   }
    // });
  }


  profile() {
    this.router.navigateByUrl(`profile`);
  }
  addDevice() {
    this.router.navigateByUrl('device-catalogue');
  }
  goDetail(device: any) {
    this.router.navigate(['/thermostat'], { queryParams: device });

  }
}
