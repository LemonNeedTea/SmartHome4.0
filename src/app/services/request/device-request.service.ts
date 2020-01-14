import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import {ToolsService} from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceRequestService {

  constructor(private axiosHttp: AxiosService) { }
  /**
   * 获取产品列表
   */
  async getProductList() {
    return await this.axiosHttp.post('/device/getProductList', {});
  }
  async getInfoByTypeID(typeID: number) {
    return await  this.axiosHttp.getByID('/deviceConfig/info1', typeID);
  }
  async getDeviceInfoBymac(mac: string, type: string) {
    return await this.axiosHttp.post('/deviceInfo/getInfoByMac', { mac, type});
  }
}
