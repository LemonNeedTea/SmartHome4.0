import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DeviceRequestService } from '../../services/request/device-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-thermostat-detail',
  templateUrl: './thermostat-detail.page.html',
  styleUrls: ['./thermostat-detail.page.scss'],
})
export class ThermostatDetailPage implements OnInit {

  constructor(private alertController: AlertController, private device: DeviceRequestService, private router: Router, private route: ActivatedRoute, private navCtrl: NavController) { 
    const queryParams = this.route.snapshot.queryParams;
    this.mac = queryParams.mac;


  }

  mac: string;
  ngOnInit() {
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '确认',
      message: '<strong>删除设备？</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.device.deleteDevice(this.mac).then(res => {
              this.navCtrl.navigateRoot(['tabs/main']).then(res => {
                location.reload();
              });
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
