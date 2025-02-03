import {Component, HostBinding, inject} from '@angular/core';

import {NgTemplateOutlet} from '@angular/common';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  template: `
    @for (toast of toastService.toasts; track toast) {
      <ngb-toast
        [class]="toast.classname"
        [autohide]="true"
        [delay]="toast.delayInMs || 5000"
        (hidden)="toastService.remove(toast)"
        (click)="toastService.remove(toast)"
      >
        <div class="d-flex gap-4 align-items-center">
          <i class="fs-m {{ toast.icon }}"></i><span>{{ toast.text }}</span>
        </div>
      </ngb-toast>
    }
  `
})
export class ToastsComponent {
  @HostBinding('class')
  hostClasses = 'toast-container position-fixed bottom-0 end-0 m-3 m-md-5';

  @HostBinding('style.z-index')
  zIndex: number = 1200;

  toastService = inject(ToastService);
}
