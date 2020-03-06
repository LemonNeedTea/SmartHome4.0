import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import { ToolsService } from '../tools.service';

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
    return await this.axiosHttp.getByID('/deviceConfig/info1', typeID);
  }
  async getDeviceInfoBymac(mac: string, type: string) {
    return await this.axiosHttp.post('/deviceInfo/getInfoByMac', { mac, type });
  }
  async addUserDeviceInfo(param: any) {
    return await this.axiosHttp.post('/userDeviceInfo/add', param);
  }

  async getDeviceDetailList() {
    return await this.axiosHttp.post('/device/getDeviceDetailList', {});
  }
  async deleteDevice(mac: string) {
    return await this.axiosHttp.postByID('/userDeviceInfo/deleteByMac', mac);
  }
  async upload(file: FormData) {
    return await this.axiosHttp.post('/upload/', file);
  }

  async addUserModeAndDetail(param: any) {
    return await this.axiosHttp.post('/userMode/addmode', param);
  }

  async getUserModeList() {
    return await this.axiosHttp.post('/userMode/getPageListByID', { current: 1, size: 100})
  }
  async getUserModeDetailList(modeId: number) {
    return await this.axiosHttp.getByID('/userModeDetail/infoByModeId', modeId)
  }

  async deleteMode(modeId: number) {
    return await this.axiosHttp.postByID('/userMode/delete', modeId)
  }

  async updateUserModeSelected(modeId: number) {
    return await this.axiosHttp.postByID('/userMode/updateSelected', modeId)
  }
}
