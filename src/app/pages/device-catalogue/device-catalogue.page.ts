import { Component, OnInit } from '@angular/core';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-device-catalogue',
  templateUrl: './device-catalogue.page.html',
  styleUrls: ['./device-catalogue.page.scss'],
})
export class DeviceCataloguePage implements OnInit {

  typeList: Array<any>;
  categoryList: Array<any>;
  showTypeList: Array<any>;
  selectCategoryID: number;
  constructor(private device: DeviceRequestService,
              private router: Router) {

    this.initData();


  }

  async initData() {
    await this.device.getProductList().then((res: any) => {
      this.typeList = res.typeList;
      this.categoryList = res.categoryList;
    });
    this.selectCategoryID = this.categoryList[0].id;
    this.getshowTypeList();

  }

  setType(id: number) {
    this.selectCategoryID = id;
    this.getshowTypeList();
  }

  getshowTypeList() {
    this.showTypeList = this.typeList.filter(item => {
      if (item.categoryId === this.selectCategoryID) {
        return item;
      }
    });
  }
  goDeviceConfig(data: any) {
    this.router.navigate(['/device-config'], { queryParams: { code: data.code, name: data.name } });
  }

  ngOnInit() {
  }

}
