import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ NavController } from '@ionic/angular';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  constructor(private router: Router,
              private navCtrl: NavController) { }

  ngOnInit() {
  }
  addDevice() {
    this.navCtrl.navigateForward('device-catalogue');
    // this.router.navigateByUrl('device-catalogue');
  }

}
