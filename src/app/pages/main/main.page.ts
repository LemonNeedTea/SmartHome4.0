
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { LoginRequestService } from '../../services/request/login-request.service';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { SocketHelperService } from '../../services/socket-helper.service';
import { ToastController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
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
  constructor(private router: Router,
    public services: ServicesService,
    private login: LoginRequestService,
    private dragulaService: DragulaService,
    private toastController: ToastController,
    private device: DeviceRequestService,
    private socketHelper: SocketHelperService) {
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
    this.logued();
    this.device.getDeviceDetailList().then((res: any) => {
      this.deviceList = res;
    });
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
}
