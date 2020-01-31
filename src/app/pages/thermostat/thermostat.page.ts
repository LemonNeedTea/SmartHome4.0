import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Variable } from '../../common/variable';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.page.html',
  styleUrls: ['./thermostat.page.scss'],
})
export class ThermostatPage implements OnInit {
  queryParams: any;
  code = 'switch_state';
  value = 0;

  constructor(private route: ActivatedRoute) {
    this.queryParams = this.route.snapshot.queryParams;
    console.log(this.queryParams);


  }

  ngOnInit() {
  }
  onClick() {
    const params = {
      type: 'set',
      mac: this.queryParams.mac,
      set: {
        code: this.code,
        // value: [this.value]
        value: [this.value]
      }
    };
    console.log(params);
    
    Variable.socketObject.sendMessage(params);
  }


}
