import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wifi-setting',
  templateUrl: './wifi-setting.page.html',
  styleUrls: ['./wifi-setting.page.scss'],
})
export class WifiSettingPage implements OnInit {
  passwordType = 'password';
  passwordIcon = 'eye-off';
  queryParams: any;
  ssid: string;
  password: string;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.queryParams = this.route.snapshot.queryParams;
    }
  ngOnInit() {
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  goWifiPush() {
    const param = {
      code: this.queryParams.code,
      name: this.queryParams.name,
      ssid: this.ssid,
      password: this.password
    };

    this.router.navigate(['/wifi-push'], { queryParams: param });
  }
}
