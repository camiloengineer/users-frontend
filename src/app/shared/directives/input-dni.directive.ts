import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { RutPipe } from './../../../libs/ng2-rut';

@Directive({
  selector: '[appInputDNI]',
  providers: [RutPipe]
})
export class InputDNIDirective {

  constructor(
    private el: ElementRef,
    private myControl: NgControl,
    private rutPipe: RutPipe
  ) { }

  @HostListener('input', ['$event']) onInput() {
    if (this.el.nativeElement.value) {
      const newValue = this.rutPipe.transform(this.el.nativeElement.value);
      this.myControl?.control?.setValue(newValue);
    }
  }
}
