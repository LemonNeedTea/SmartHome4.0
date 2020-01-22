import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.page.html',
  styleUrls: ['./thermostat.page.scss'],
})
export class ThermostatPage implements OnInit {
  queryParams: any;
  constructor(private route: ActivatedRoute) {
    this.queryParams = this.route.snapshot.queryParams;
    console.log(this.queryParams);


  }

  ngOnInit() {
  }

}
