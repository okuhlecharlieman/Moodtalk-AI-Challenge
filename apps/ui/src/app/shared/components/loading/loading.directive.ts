import {Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {randomAlphanumeric} from '../../utils';

/**
 * Heavily inspired by https://medium.com/front-end-tricks/simple-loading-directive-for-angular-9a373ef8409c
 */
@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit, OnChanges {
  @HostBinding('style.position')
  hostPosition = 'relative';

  @Input() appLoading = false;
  @Input() appLoadingText = '';

  uid = '';

  constructor(
    private targetEl: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.uid = 'loading-container-' + randomAlphanumeric(12);

    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(loadingContainer, 'display', this.appLoading ? 'flex' : 'none');
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.setStyle(loadingContainer, 'flex-direction', 'column');
    this.renderer.setStyle(loadingContainer, 'gap', '1em');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    this.renderer.setStyle(loadingContainer, 'background', 'rgba(130, 130, 130, .95)');
    this.renderer.setStyle(loadingContainer, 'z-index', '1001');
    this.renderer.setStyle(loadingContainer, 'border-radius', '5px');
    this.renderer.setStyle(loadingContainer, 'opacity', '50');
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');

    // custom spinner -- start
    const spinnerContainer = this.renderer.createElement('div');
    this.renderer.addClass(spinnerContainer, 'lds-grid');

    const spinnerInnerDiv1 = this.renderer.createElement('div');
    const spinnerInnerDiv2 = this.renderer.createElement('div');
    const spinnerInnerDiv3 = this.renderer.createElement('div');
    const spinnerInnerDiv4 = this.renderer.createElement('div');
    const spinnerInnerDiv5 = this.renderer.createElement('div');
    const spinnerInnerDiv6 = this.renderer.createElement('div');
    const spinnerInnerDiv7 = this.renderer.createElement('div');
    const spinnerInnerDiv8 = this.renderer.createElement('div');
    const spinnerInnerDiv9 = this.renderer.createElement('div');

    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv4);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv5);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv6);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv7);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv8);
    this.renderer.appendChild(spinnerContainer, spinnerInnerDiv9);

    this.renderer.appendChild(loadingContainer, spinnerContainer);

    const textDiv = this.renderer.createElement('div');
    this.renderer.addClass(textDiv, 'fw-semibold');
    this.renderer.addClass(textDiv, 'text-white');

    const text = this.renderer.createText(this.appLoadingText);
    this.renderer.appendChild(textDiv, text);
    this.renderer.appendChild(loadingContainer, textDiv);
    // custom spinner -- end

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.appLoading && this.uid) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.' + this.uid);
      if (div) {
        this.renderer.setStyle(div, 'display', this.appLoading ? 'flex' : 'none');
      }
    }
  }
}
