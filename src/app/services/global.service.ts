import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public DeviceData: any = {};
  public globalVar: BehaviorSubject<any[]> = new BehaviorSubject([]);
}
