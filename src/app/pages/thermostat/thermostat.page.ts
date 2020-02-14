import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from '../../common/variable';
import { variable } from '@angular/compiler/src/output/output_ast';
import * as ProgressBar from 'progressbar.js';
import { GlobalService } from '../../services/global.service';
import { Subject, Observable, Subscribable, from } from 'rxjs';
import { ToolsService } from '../../services/tools.service';
import { ModalController } from '@ionic/angular';
import { AirSettingModalPage } from '../modals/air-setting-modal/air-setting-modal.page'

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.page.html',
  styleUrls: ['./thermostat.page.scss'],
})
export class ThermostatPage implements OnInit {
  queryParams: any;
  code = 'switch_state';
  value = 0;

  name: string;
  id: number;
  paramData: any = {};
  temp: number = 16;
  private tempMax: number = 30;
  private tempMin: number = 15;
  barCircleObj: any;
  modeKV: any = [];
  speedKV: any = [];
  tempKv: any = [];

  open: boolean;
  eco: boolean;
  // speed: number;
  airData: any = {};
  private monitorID: number;
  private deviceID: number;
  tempColumns: any = [];

  airParams: any;
  paramsData: any;
  roomTempData: any;
  // settingTempData: any;
  selectedMode: any = {};
  selectedSpped: any = {};
  openData: any;
  fnID: number;
  fnID3: number;
  airfFnID: string;
  airTimerfFnID: string;
  setInfo: any = { type: '', value: '' };
  airTypeParam: any = {};
  speedMode: boolean;
  keyboardLock: boolean;
  valve1: boolean;
  valve2: boolean;
  linkage: boolean;
  airSetInfo: object = {};
  coolOffline: number;
  hotUpperLimit: number;
  timer1Open: boolean;
  timer2Open: boolean;
  timer3Open: boolean;
  timer4Open: boolean;
  tempTimeoutObj: any = null;
  mac: string;
  deviceDataSubscribe: any;



  constructor(private route: ActivatedRoute, private globalService$: GlobalService, private tools: ToolsService, public modalController: ModalController, private router: Router) {
    this.queryParams = this.route.snapshot.queryParams;
    console.log(this.queryParams);
    this.id = this.queryParams.id;
    this.name = this.queryParams.name;
    this.mac = this.queryParams.mac;
    this.paramData = this.queryParams.data;


  }

  ngOnDestroy(): void {
    this.deviceDataSubscribe.unsubscribe();

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  ngOnInit() {
    this.airTypeParam = {
      "MonitorID": 6,
      "FnID": 1,
      "airParam": {
        "floorHeating": [
          {
            "F_ID": 23,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "floorHeating",
            "F_ParamsName": "地暖阀回差",
            "F_ParamsName_En": "Floor heating valve hysteresis",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "backlightDelay": [
          {
            "F_ID": 22,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "backlightDelay",
            "F_ParamsName": "背光延迟时间",
            "F_ParamsName_En": "Backlight delay time",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "tempDeviation": [
          {
            "F_ID": 25,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "tempDeviation",
            "F_ParamsName": "温度偏移",
            "F_ParamsName_En": "Temperature offset",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "setTemp": [
          {
            "F_ID": 8,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "setTemp",
            "F_ParamsName": "设置温度",
            "F_ParamsName_En": "Set temperature",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "open": [
          {
            "F_ID": 7,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "open",
            "F_ParamsName": "开关状态",
            "F_ParamsName_En": "switch status",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "roomTemp": [
          {
            "F_ID": 6,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "roomTemp",
            "F_ParamsName": "环境温度",
            "F_ParamsName_En": "Ambient temperature",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "speedMode": [
          {
            "F_ID": 10,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "speedMode",
            "F_ParamsName": "风速模式",
            "F_ParamsName_En": "Wind speed mode",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "value1": [
          {
            "F_ID": 14,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "value1",
            "F_ParamsName": "水阀1关",
            "F_ParamsName_En": "Water valve 1 off",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          },
          {
            "F_ID": 15,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "value1",
            "F_ParamsName": "水阀1开",
            "F_ParamsName_En": "Water valve 1 open",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 1
          }
        ],
        "speed": [
          {
            "F_ID": 13,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "speed",
            "F_ParamsName": "高",
            "F_ParamsName_En": "high",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 3
          },
          {
            "F_ID": 12,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "speed",
            "F_ParamsName": "中",
            "F_ParamsName_En": "in",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 2,
            "F_paramsValue": 2
          },
          {
            "F_ID": 11,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "speed",
            "F_ParamsName": "低",
            "F_ParamsName_En": "low",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 3,
            "F_paramsValue": 1
          }
        ],
        "coolOffline": [
          {
            "F_ID": 21,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "coolOffline",
            "F_ParamsName": "制冷下限",
            "F_ParamsName_En": "Lower cooling limit",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "value2": [
          {
            "F_ID": 16,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "value2",
            "F_ParamsName": "水阀2关",
            "F_ParamsName_En": "Water valve 2 off",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          },
          {
            "F_ID": 17,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "value2",
            "F_ParamsName": "水阀2开",
            "F_ParamsName_En": "Water valve 2 open",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 1
          }
        ],
        "mode": [
          {
            "F_ID": 1,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "mode",
            "F_ParamsName": "地暖模式",
            "F_ParamsName_En": "Floor heating mode",
            "F_Icon": "dinuan.png",
            "F_Class": "hot",
            "F_Sort": 1,
            "F_paramsValue": 0
          },
          {
            "F_ID": 2,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "mode",
            "F_ParamsName": "热风模式",
            "F_ParamsName_En": "Hot air mode",
            "F_Icon": "nuanfeng.png",
            "F_Class": "hot",
            "F_Sort": 2,
            "F_paramsValue": 1
          },
          {
            "F_ID": 3,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "mode",
            "F_ParamsName": "制冷模式",
            "F_ParamsName_En": "Cooling mode",
            "F_Icon": "cool.png",
            "F_Class": "cool",
            "F_Sort": 3,
            "F_paramsValue": 2
          },
          {
            "F_ID": 4,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "mode",
            "F_ParamsName": "通风模式",
            "F_ParamsName_En": "Ventilation mode",
            "F_Icon": "songfeng.png",
            "F_Class": "cool1",
            "F_Sort": 4,
            "F_paramsValue": 3
          },
          {
            "F_ID": 5,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "mode",
            "F_ParamsName": "地暖&热风模式",
            "F_ParamsName_En": "Floor heating & hot air mode",
            "F_Icon": "nuanfeng1.png",
            "F_Class": "hot",
            "F_Sort": 5,
            "F_paramsValue": 4
          }
        ],
        "keyboardLock": [
          {
            "F_ID": 24,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "keyboardLock",
            "F_ParamsName": "键盘锁",
            "F_ParamsName_En": "Keyboard lock",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "hotUpperLimit": [
          {
            "F_ID": 20,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "hotUpperLimit",
            "F_ParamsName": "制热上限",
            "F_ParamsName_En": "Heating limit",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ],
        "linkage": [
          {
            "F_ID": 18,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "linkage",
            "F_ParamsName": "联动关",
            "F_ParamsName_En": "Linkage off",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          },
          {
            "F_ID": 19,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "linkage",
            "F_ParamsName": "联动开",
            "F_ParamsName_En": "Linkage open",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 1
          }
        ],
        "eco": [
          {
            "F_ID": 9,
            "F_AirTypeCode": "yssAir",
            "F_ParamsCode": "eco",
            "F_ParamsName": "节能模式",
            "F_ParamsName_En": "Energy saving mode",
            "F_Icon": "",
            "F_Class": "",
            "F_Sort": 1,
            "F_paramsValue": 0
          }
        ]
      },
      "airGetInfo": {
        "floorHeating": "F114",
        "backlightDelay": "F113",
        "tempDeviation": "F116",
        "setTemp": "F14",
        "open": "F12",
        "roomTemp": "F11",
        "serviceAddress2": "F61,F62,F63,F64,F65",
        "speedMode": "F16",
        "value1": "F18",
        "speed": "F17",
        "coolOffline": "F112",
        "value2": "F19",
        "mode": "F13",
        "keyboardLock": "F115",
        "serviceAddress1": "F61,F62,F63,F64,F65",
        "hotUpperLimit": "F111",
        "linkage": "F110",
        "eco": "F15"
      },
      "airSetInfo": {
        "coolOffline": 7,
        "keyboardLock": 12,
        "backlightDelay": 8,
        "open": 1,
        "hotUpperLimit": 6,
        "setTemp": 3,
        "eco": 5,
        "speed": 4,
        "mode": 2,
        "value2": 11,
        "value1": 10,
        "tempDeviation": 13
      }
    };
    this.airSetInfo = this.airTypeParam.airSetInfo;
    if (this.airTypeParam.airParam) {
      this.modeKV = this.airTypeParam.airParam["mode"];
      this.speedKV = this.airTypeParam.airParam['speed'];
    }
    this.setCircle();

    // 设备实时数据接收
    this.initDeviceData();
    this.deviceDataSubscribe = this.globalService$.globalVar.subscribe((res: any) => {
      if (res.mac && res.mac === this.mac) {
        this.initDeviceData();
      }
    });


  }
  initDeviceData() {
    const deviceDatas = this.globalService$.DeviceData
    if (!deviceDatas || !deviceDatas[this.mac]) {
      return;
    }
    console.log("我变化啦");
    console.log(deviceDatas[this.mac]);
    const deviceData = deviceDatas[this.mac];
    this.roomTempData = deviceData.temp_envi;
    this.temp = deviceData.temp_set;
    if (this.setInfo.type === 'setTemp') { if (this.temp == this.setInfo.value) { this.dismissLoading(); } }
    this.keyboardLock = deviceData.key_lock;
    this.linkage = deviceData.state_link;// 联动
    this.valve1 = deviceData.state_water1;// 水阀1
    this.valve2 = deviceData.state_water2;// 水阀2
    this.open = this.tools.parseToBooleanByString(deviceData.switch_state);
    if (this.setInfo.type === 'open') { if (this.open == this.setInfo.value) { this.dismissLoading(); } }

    this.speedMode = this.tools.parseToBooleanByString(deviceData.mode_fan);
    console.log(this.speedMode);

    const speedValue = deviceData.state_fan;
    this.getSpeedState(speedValue, deviceData.mode_fan);// 获取风速状态
    this.eco = this.tools.parseToBooleanByString(deviceData.mode_save);
    if (this.setInfo.type === 'eco') { if (this.eco == this.setInfo.value) { this.dismissLoading(); } }

    this.hotUpperLimit = deviceData.hot_up;
    this.coolOffline = deviceData.cold_down;

    this.getModeState(deviceData.mode_work);// 获取模式状态
    this.setCircleNum();


  }
  controlDevice(code: string, value: any) {
    const params = {
      type: 'set',
      mac: this.queryParams.mac,
      set: {
        code,
        value: [value]
      }
    };
    console.log(params);

    Variable.socketObject.sendMessage(params);
    this.tools.showLoading('');
  }
  getTempColumns() {
    const t = [];
    for (let i = this.tempMin; i <= this.tempMax; i++) {
      t.push({ text: `${i}`, value: i });
    }
    this.tempColumns = [
      {
        options: t
      }];
  }

  private getTempNum(data: string) {
    let num: number = Number(data);
    return num;
  }
  setCircle() {
    this.barCircleObj = new ProgressBar.Circle(document.getElementById('circlebar'), {
      strokeWidth: 3,
      easing: 'easeInOut',
      duration: 500,
      color: '#52A1F3',
      trailColor: '#eee',
      trailWidth: 3,
      svgStyle: null,
      // boxShadow: '0 2px 6px 0 #4D95DF',
    });
    // this.setCircleNum();
  }
  setCircleNum() {
    this.getTempColumns();
    const num = (this.temp * 1 - this.tempMin * 1) / (this.tempMax * 1 - this.tempMin * 1);
    console.log(num);
    this.barCircleObj.animate(num);
  }
  tempAdd() {
    this.temp = Number(this.temp);
    if (this.temp < this.tempMax) {
      this.temp++;
      // this.setCircleNum();
      this.setTempoutTemp();

    }

  }
  setTempoutTemp() {
    if (this.tempTimeoutObj) {
      clearTimeout(this.tempTimeoutObj);
    }
    this.tempTimeoutObj = setTimeout(() => {
      this.setCircleNum();
      this.setAirTemp();
    }, 500);
  }
  private setAirTemp() {
    // Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['setTemp'], Number(this.temp))
    this.controlDevice('temp_set', this.temp);
    this.checkSetInfo('setTemp', this.temp);

  }
  tempSub() {
    this.temp = Number(this.temp);

    if (this.temp > this.tempMin) {
      this.temp--;
      // this.setCircleNum();
      this.setTempoutTemp();
    }
  }
  changeTemp() {
    this.setCircleNum();
    this.setAirTemp();

  }
  modeChange() {
  }

  setOpen() {
    this.open = !this.open;
    this.controlDevice('switch_state', this.open ? 1 : 0)
    // Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['open'], this.open ? 1 : 0)
    this.checkSetInfo('open', this.open);
  }
  setEco() {
    this.eco = !this.eco;
    // Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['eco'], this.eco ? 1 : 0)
    this.controlDevice('mode_save', this.eco ? 1 : 0);
    this.checkSetInfo('eco', this.eco);
  }
  setSpeed(data: any) {
    this.speedMode = true;
    this.selectedSpped = data;
    // this.setAir(data['F_Mode'], data['F_Code']);
    // Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['speed'], data.F_paramsValue)
    this.controlDevice('state_fan', data.F_paramsValue);
    this.checkSetInfo('speed', data.F_ID);


  }
  setSpeedMode() {
    this.selectedSpped = {};
    this.speedMode = false;
    // this.setAir(data['F_Mode'], data['F_Code']);
    // Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['speed'], 0)
    this.controlDevice('state_fan', 0)
    this.checkSetInfo('speedMode', true);


  }

  async setMode() {
    const modalObj = await this.modalController.create({
      component: AirSettingModalPage,
      componentProps: {
        Data: this.modeKV
      }
    });
    modalObj.present();
    // 模态框被关闭后回回调该方法 res 为返回值
    modalObj.onDidDismiss().then((res: any) => {
      res = res.data;
      console.log(res);
      if (res != null) {
        this.selectedMode = res;
        // Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['mode'], res.F_paramsValue)
        this.controlDevice('mode_set', res.F_paramsValue);
        this.checkSetInfo('mode', res.F_ID);
      }
    })
    // let modalObj = this.modalCtrl.create('AirSettingModePage', { Data: this.modeKV });
    // modalObj.onDidDismiss(res => {
    //   if (res != null) {
    //     this.selectedMode = res;
    //     Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['mode'], res.F_paramsValue)
    //     this.checkSetInfo('mode', res.F_ID);
    //   }
    // });
    // modalObj.present();


  }

  setAir(mode: string, code: string) {
    let setID = this.airParams.F_SetID;

    let data = `${setID},${mode},${code}`;//42 主机标号 模式 参数


    // Variable.socketObject.setAir(data, this.airParams.F_MonitorID, this.airParams.F_SetFnID);
  }
  checkSetInfo(type: string, value: any) {
    this.setInfo.type = type;
    this.setInfo.value = value;
  }
  getSpeedState(speed: string, speedMode: string) {// 获取风速状态
    if (speedMode == '0') {
      this.speedMode = false;
      if (this.setInfo.type === 'speedMode') { this.dismissLoading(); }
      this.selectedSpped = {};
    } else {
      let temp = {};
      this.speedKV.forEach(element => {
        if (element.F_paramsValue == speed) {
          temp = element;
          // this.speedMode = false;
        }
      });
      if (temp) {
        if (this.setInfo.type === 'speed') { if (temp["F_ID"] == this.setInfo.value) { this.dismissLoading(); } }

      }
      this.selectedSpped = temp;
    }
  }

  getModeState(modeValue: string) {// 获取模式状态
    this.modeKV.forEach(element => {
      if (element.F_paramsValue == modeValue) {
        this.selectedMode = element;
        if (this.eco) {
          if (element.F_Class == 'hot') {
            this.tempMax = this.hotUpperLimit;
            this.tempMin = 15;
          } else if (element.F_Class == 'cool') {
            this.tempMin = this.coolOffline;
            this.tempMax = 30;
          } else {
            this.tempMin = 15;
            this.tempMax = 30;
          }
        } else {
          this.tempMin = 15;
          this.tempMax = 30;
        }

        if (this.setInfo.type === 'mode') { if (element.F_ID == this.setInfo.value) { this.dismissLoading(); } }

      }
    });
  }
  dismissLoading() {
    this.setInfo.type = '';
    this.setInfo.value = '';
    this.tools.dismissLoading();
  }
  goMorePage() {
    this.router.navigate(['/thermostat-detail'], { queryParams: this.queryParams });
  }

}
