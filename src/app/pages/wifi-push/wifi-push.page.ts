import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wifi-push',
  templateUrl: './wifi-push.page.html',
  styleUrls: ['./wifi-push.page.scss'],
})
export class WifiPushPage implements OnInit {

  queryParams: any;
  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.queryParams = this.route.snapshot.queryParams; // queryParams.wifi queryParams.password
  }
  ngOnInit() {
  }

}
