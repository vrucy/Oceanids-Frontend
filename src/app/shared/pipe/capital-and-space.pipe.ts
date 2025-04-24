import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalAndSpace'
})
export class CapitalAndSpacePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    let newValue = value.replace(/_/g, ' ');
    return newValue.charAt(0).toUpperCase() + newValue.slice(1);
  }
}
