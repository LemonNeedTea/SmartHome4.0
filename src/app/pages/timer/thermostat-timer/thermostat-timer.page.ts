import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-thermostat-timer',
  templateUrl: './thermostat-timer.page.html',
  styleUrls: ['./thermostat-timer.page.scss'],
})
export class ThermostatTimerPage implements OnInit {
title: string;
  constructor( public modalCtrl: ModalController) {

    this.title = '定时';
   }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
