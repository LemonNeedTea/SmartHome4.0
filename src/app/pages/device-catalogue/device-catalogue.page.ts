import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-device-catalogue',
  templateUrl: './device-catalogue.page.html',
  styleUrls: ['./device-catalogue.page.scss'],
})
export class DeviceCataloguePage implements OnInit {

  typeList: Array<any>;
  deviceList: Array<any>;
  showDeviceList: Array<any>;
  selectTypeID: number;
  constructor() {

    this.initData();


  }

  async initData() {
    await this.getTypeList();
    await this.gedeviceList();
    this.selectTypeID = this.typeList[0].id;
    this.getShowDeviceList();

  }

  async getTypeList() {
    this.typeList = [
      { id: 1, name: '分类1' },
      { id: 2, name: '分类2' },
      { id: 3, name: '分类3' },
      { id: 4, name: '分类4' },
      { id: 5, name: '分类5' },
    ];
    this.selectTypeID = this.typeList[0].id;
  }
  setType(id: number) {
    this.selectTypeID = id;
    this.getShowDeviceList();
  }

  getShowDeviceList() {
    this.showDeviceList = this.deviceList.filter(item => {
      if (item.typeID === this.selectTypeID) {
        return item;
      }
    })
  }

  async gedeviceList() {
    this.deviceList = [
      { id: 1, typeID: 1, name: '温控器', img: 'http://q3kk8vh2a.bkt.clouddn.com/air.png' },
      { id: 2, typeID: 1, name: '设备2', img: 'http://q3kk8vh2a.bkt.clouddn.com/air.png' },
      { id: 3, typeID: 1, name: '设备3', img: 'http://q3kk8vh2a.bkt.clouddn.com/air.png' },
      { id: 4, typeID: 1, name: '设备4', img: 'http://q3kk8vh2a.bkt.clouddn.com/air.png' },
      { id: 5, typeID: 2, name: '设备5', img: 'http://q3kk8vh2a.bkt.clouddn.com/air.png' },
    ];

  }

  ngOnInit() {
  }

}
