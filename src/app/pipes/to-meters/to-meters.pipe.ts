import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMeters',
  pure: true,
  standalone: true,
})
export class ToMetersPipe implements PipeTransform {
  transform(value: number): string {
    const meters: number = value / 10;
    return `${meters}m`;
  }
}
