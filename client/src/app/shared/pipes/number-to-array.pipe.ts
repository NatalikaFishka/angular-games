import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(cardsInPlay: number, startFrom: number = 1): number[] {

    let numberInArray = startFrom;
    let arrayLength = cardsInPlay - startFrom + 1;

    return Array(arrayLength).fill(undefined).map(() => numberInArray++);
  }

}
