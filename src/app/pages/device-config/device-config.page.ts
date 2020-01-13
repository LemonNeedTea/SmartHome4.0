import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceRequestService } from '../../services/request/device-request.service';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.page.html',
  styleUrls: ['./device-config.page.scss'],
})
export class DeviceConfigPage implements OnInit {

  img: string;
  constructor(private route: ActivatedRoute, private device: DeviceRequestService) {
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
    this.device.getInfoByTypeID(queryParams.code).then((res: any) => {
      console.log(res);
      this.img = res.img;
    });
   }

  ngOnInit() {
  }

}
