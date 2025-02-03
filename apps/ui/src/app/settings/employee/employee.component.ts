import {Component, Input, ViewChild} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {EmployeeProperties} from '../../../generated';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {
  @ViewChild('modal') modal!: ModalComponent;

  @Input()
  set properties(p: EmployeeProperties) {
    this.nameFormControl.setValue(p.name);
  }

  nameFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  addEmployee() {
    if (this.nameFormControl.valid) {
      this.modal.save({
        name: this.nameFormControl.value
      });
    }
  }
}
