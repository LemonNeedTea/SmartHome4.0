import { Component, OnInit } from '@angular/core';
import { NavParams , ModalController } from '@ionic/angular';

@Component({
  selector: 'app-air-setting-modal',
  templateUrl: './air-setting-modal.page.html',
  styleUrls: ['./air-setting-modal.page.scss'],
})
export class AirSettingModalPage implements OnInit {
  dataList: Array<any> = [];
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { 
    this.dataList = navParams.get('Data');
  }

  ngOnInit() {
  }
  dismiss(data: any) {
  //  if (data != null) {
     this.modalCtrl.dismiss(data);
    // } else {
    //  this.modalCtrl.dismiss(data);
    // }
  }

}
