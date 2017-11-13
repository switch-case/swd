import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population'
})
export class PopulationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return !!value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value;
  }
}
