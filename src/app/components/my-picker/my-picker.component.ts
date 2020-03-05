import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'my-picker',
  templateUrl: './my-picker.component.html',
  styleUrls: ['./my-picker.component.scss'],
})
export class MyPickerComponent implements OnInit {

  dataList: any;
  loop: number;
  /**
   * 自定义model变量
   */
  /**
   * 返回父组件变化后的值
   */
  @Input() name: string = '标题';
  @Input() columns: Array<any>;

  @Input()
  set myModel(v: any) {
      this.loop = parseInt(v)
  }
  @Output()
  myModelChange: EventEmitter<any> = new EventEmitter();

  get myModel() {
    return this.loop;
  };

  constructor() {

  }
 
  ngOnInit() {
    this.dataList =  this.columns;
  }
  change() {
      this.myModelChange.emit(this.loop);

  }

}
