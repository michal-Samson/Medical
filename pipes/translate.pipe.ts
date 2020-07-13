import { Pipe, PipeTransform } from '@angular/core';
import { HE } from '../data/he';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): any {
    return HE[value] || value;
  }

}
