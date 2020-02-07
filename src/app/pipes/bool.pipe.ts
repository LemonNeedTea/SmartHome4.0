import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (parseInt(value)) {
      let n = parseInt(value);
      if (n == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

}
