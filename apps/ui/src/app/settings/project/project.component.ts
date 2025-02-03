import {Component, Input, ViewChild} from '@angular/core';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {EmployeeProperties, ProjectProperties} from '../../../generated';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent {
  @ViewChild('modal') modal!: ModalComponent;

  @Input()
  set properties(p: ProjectProperties) {
    this.nameFormControl.setValue(p.name);
  }

  nameFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  colorFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  projectFormGroup = new FormGroup({
    name: this.nameFormControl,
    color: this.colorFormControl
  });

  addProject() {
    if (this.projectFormGroup.valid) {
      this.modal.save({
        name: this.nameFormControl.value,
        color: this.colorFormControl.value
      });
    }
  }
}
