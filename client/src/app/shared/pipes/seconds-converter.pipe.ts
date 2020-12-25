import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsConverter'
})
export class SecondsConverterPipe implements PipeTransform {

  transform(value: number | null): string {
    if(typeof value === "number") {
      const minutes: number = Math.floor(value / 60);
      const seconds: number = value - minutes * 60;
      return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    } else {
      return "";
    }
  }

}
