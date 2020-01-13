import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceRequestService } from '../../services/request/device-request.service';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.page.html',
  styleUrls: ['./device-config.page.scss'],
})
export class DeviceConfigPage implements OnInit {

  img: string;
  queryParams: any;
  constructor(private route: ActivatedRoute, private device: DeviceRequestService,
              private router: Router) {
    this.queryParams = this.route.snapshot.queryParams;
    console.log(this.queryParams);
    this.device.getInfoByTypeID(this.queryParams.code).then((res: any) => {
      console.log(res);
      this.img = res.img;
    });
   }

  ngOnInit() {
  }
  goWifiSettting() {
    this.router.navigate(['/wifi-setting'], { queryParams: this.queryParams});
  }

}
