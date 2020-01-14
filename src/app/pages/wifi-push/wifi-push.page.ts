import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsptouchService } from '../../services/esptouch.service'

@Component({
  selector: 'app-wifi-push',
  templateUrl: './wifi-push.page.html',
  styleUrls: ['./wifi-push.page.scss'],
})
export class WifiPushPage implements OnInit {

  queryParams: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private esptouch: EsptouchService) {
    this.queryParams = this.route.snapshot.queryParams; // queryParams.wifi queryParams.password
  }
  ngOnInit() {
    this.esptouch.start(this.queryParams.ssid, this.queryParams.password).then((res: any) => {
      alert(JSON.stringify(res));
    }, err => {

    });
  }
  ngOnDestroy() {
    this.esptouch.close();
  }

}
