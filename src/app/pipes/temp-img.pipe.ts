import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'tempImg'
})
export class TempImgPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  transform(value: any): any {
    const url = value;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
