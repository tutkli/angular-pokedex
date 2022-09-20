import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKilograms',
  pure: true,
  standalone: true,
})
export class ToKilogramsPipe implements PipeTransform {
  transform(value: number): string {
    const kilograms: number = value / 10;
    return `${kilograms}kg`;
  }
}
