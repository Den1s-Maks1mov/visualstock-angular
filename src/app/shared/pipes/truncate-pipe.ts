import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | null | undefined, limit: number = 50, trail: string = '...'): string {
    if (!value) {
      return '';
    }
    const str = String(value);
    return str.length > limit ? str.substring(0, limit) + trail : str;
  }

}
