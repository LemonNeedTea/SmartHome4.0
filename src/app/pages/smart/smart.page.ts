import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.page.html',
  styleUrls: ['./smart.page.scss'],
})
export class SmartPage implements OnInit {
  modeHeight:any;
  
  constructor() { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.modeHeight = `${(htmlWidth ) / 2.3}px`;
  }


  

}
