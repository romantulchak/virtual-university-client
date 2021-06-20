import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'switchFile'
})
export class SwitchFilePipe implements PipeTransform {

  transform(cases: string[], options: string): any {
    let fileExtension = options.substring(options.lastIndexOf('.')+1, options.length) || options;
    return cases.includes(fileExtension) ? fileExtension : !fileExtension;
  }

}
