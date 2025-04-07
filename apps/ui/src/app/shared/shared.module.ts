import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ModalComponent } from './components/modal/modal.component';
import { UserInitialsComponent } from './components/user-initials/user-initials.component';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    ButtonComponent,
    FormErrorsComponent,
    ModalComponent,
    UserInitialsComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormErrorsComponent,
    ModalComponent,
    UserInitialsComponent,
    ToastsComponent
  ]
})
export class SharedModule { }
