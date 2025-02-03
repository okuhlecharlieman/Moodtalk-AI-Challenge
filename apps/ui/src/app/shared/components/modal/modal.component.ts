import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  constructor(private ngbActiveModal: NgbActiveModal) {}

  @Input() useBackground = false;

  public dismiss(): void {
    this.ngbActiveModal.dismiss();
  }

  public save(result?: any): void {
    this.ngbActiveModal.close(result);
  }
}
