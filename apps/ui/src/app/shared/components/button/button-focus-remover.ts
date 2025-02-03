import {Directive, HostListener, ElementRef} from '@angular/core';

/**
 * This directive removes focus from the selectors after clicking on them
 * Heavily inspired by https://gist.github.com/AlejandroPerezMartin/ecd014cb8104c235b582f3a3e1649cf7
 */
@Directive({
  selector: 'button[appFocusRemover]'
})
export class FocusRemoverDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('click', ['$event.target']) onClick() {
    this.elRef.nativeElement.blur();
  }
}
