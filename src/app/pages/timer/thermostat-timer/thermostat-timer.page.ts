import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToolsService } from '../../../services/tools.service';
import { airSettingTimerParams } from '../../../models/AirTimer';
import { Variable } from '../../../common/variable';

@Component({
  selector: 'app-thermostat-timer',
  templateUrl: './thermostat-timer.page.html',
  styleUrls: ['./thermostat-timer.page.scss'],
})
export class ThermostatTimerPage implements OnInit {
  modeColumns = [];
  tempMin: number = 15;
  tempMax: number = 30;
  tempColumns: any = [];
  modeModal: any;
  speedModal: any;
  tempModal: any;
  startDate: any;
  stopDate: any;
  startDate1: any;
  stopDate1: any;
  loop: Array<number>;

  @Input() mode: Array<any>;
  @Input() speed: Array<any>;
  @Input() titleNum: number;
  @Input() mac: string;
  @Input() deviceRealData: any;


  constructor(public modalCtrl: ModalController, public tools: ToolsService) {

  }

  ngOnInit() {
    this.getTempColumns();
    this.getModeColumns();
    this.getTimerFnData();
  }
  getTempColumns() {
    let t = [];
    for (let i = this.tempMin; i <= this.tempMax; i++) {
      t.push({ value: `${i}℃`, key: i });
    }
    this.tempColumns = t
  }

  getModeColumns() {
    let t = [];
    this.mode.forEach(element => {
      t.push({ value: `${element["F_ParamsName"]}`, key: element["F_paramsValue"] });
    });
    this.modeColumns = t;
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  getTimerFnData() {
    const data = this.deviceRealData;
    const num = this.titleNum;
    let loopData = data[`timing_week` + num];
    this.loop = this.getBinaryArr(loopData);
    this.startDate = [data[`timing_start${num}_hour1`], data[`timing_start${num}_minute1`]];
    this.stopDate = [data[`timing_stop${num}_hour1`], data[`timing_stop${num}_minute1`]];
    this.startDate1 = [data[`timing_start${num}_hour2`], data[`timing_start${num}_minute2`]];
    this.stopDate1 = [data[`timing_stop${num}_hour2`], data[`timing_stop${num}_minute2`]];
    this.modeModal = data[`timing_mode${num}`];
    this.tempModal = data[`timing_temp${num}`];

  }
  save() {
    this.getSettingParams();
  }
  getSettingParams() {
    let params = new airSettingTimerParams();
    params.code = this.titleNum-1;
    params.loop = this.tools.getNumberByArr(this.loop);
    params.startDate = this.startDate;

    params.stopDate = this.stopDate;
    params.startDate1 = this.startDate1;

    params.stopDate1 = this.stopDate1;
    params.mode = this.modeModal;
    params.speed = '0';
    params.temp = this.tempModal;
    const controlData = this.tools.getSendControl(params, 13);
    this.controlDevice('timing', controlData);
    setTimeout(() => {
      this.tools.dismissLoading();
      this.dismiss();
    }, 2000);
  }

  controlDevice(code: string, value: any) {
    const params = {
      type: 'set',
      mac: this.mac,
      set: {
        code,
        value: value
      }
    };
    console.log(params);

    Variable.socketObject.sendMessage(params);
    this.tools.showLoading('');
  }
  getBinaryArr(num: any): any {
    let arr: Array<number> = [];
    let binStr = parseInt(num).toString(2);
    let fullBinStr = this.tools.padStart(binStr, 7, '0');
    let splitArr = fullBinStr.match(/\w/gi);
    let resplitArr = splitArr.reverse();
    arr.push(parseInt(resplitArr[6]));
    arr.push(parseInt(resplitArr[0]));
    arr.push(parseInt(resplitArr[1]));
    arr.push(parseInt(resplitArr[2]));
    arr.push(parseInt(resplitArr[3]));
    arr.push(parseInt(resplitArr[4]));
    arr.push(parseInt(resplitArr[5]));
    return arr;

  }
}
