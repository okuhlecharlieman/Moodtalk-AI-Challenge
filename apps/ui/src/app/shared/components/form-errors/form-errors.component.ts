import {Component, Input, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {fromNgbDate} from '../../utils';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html'
})
export class FormErrorsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  formControl: FormControl | undefined;

  @Input()
  set control(formControl: FormControl) {
    this.formControl = formControl;
  }

  /**
   * Set this variable to true if you want to reserve space for the error message.
   * This avoids flickering of the form when the error message is shown but uses some whitespace.
   */
  @Input()
  reserveSpace: boolean = true;

  /**
   * Sometimes you want a bit more control over paddings and colors of the error message.
   * You can overwrite the default css classes with this variable.
   */
  @Input()
  errorMessageCssClasses: string = 'fs-s px-1 py-1 text-red-500';

  constructor(private datePipe: DatePipe) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMessage(): string {
    if (this.formControl?.errors?.required) {
      return $localize`:@@validation.required:Dies ist ein Pflichtfeld`;
    }

    if (this.formControl?.errors?.minlength) {
      return $localize`:@@validation.minLength:Die Mindestlänge beträgt ${this.formControl.errors.minlength.requiredLength} Zeichen`;
    }

    if (this.formControl?.errors?.maxlength) {
      return $localize`:@@validation.maxLength:Die Maximallänge beträgt ${this.formControl.errors.maxlength.requiredLength} Zeichen`;
    }

    if (this.formControl?.errors?.min) {
      return $localize`:@@validation.min:Das Minimum ist ${this.formControl.errors.min.min}.`;
    }

    if (this.formControl?.errors?.max) {
      return $localize`:@@validation.max:Das Maximum ist ${this.formControl.errors.max.max}.`;
    }

    if (this.formControl?.errors?.pattern) {
      if (this.formControl?.errors?.pattern.requiredPattern === '^[0-9]*$') {
        return $localize`:@@validation.integer:Es muss eine ganze Zahl eingegeben werden.`;
      } else {
        return $localize`:@@validation.pattern:Es muss folgendes Format verwendet werden: ${this.formControl?.errors?.pattern.requiredPattern}.`;
      }
    }

    if (this.formControl?.errors?.alreadyPresent) {
      return $localize`:@@validation.alreadyPresent:Existiert bereits.`;
    }

    if (this.formControl?.errors?.email) {
      return $localize`:@@validation.email:Es muss eine gültige Email Adresse eingegeben werden.`;
    }

    if (this.formControl?.errors?.ngbDate?.minDate?.minDate) {
      const ngbMinDate = fromNgbDate(this.formControl.errors.ngbDate.minDate.minDate);
      const minDate = this.datePipe.transform(ngbMinDate, 'dd.MM.yyyy');
      return $localize`:@@validation.min-date:Das Datum muss am oder nach dem ${minDate} liegen.`;
    }

    if (this.formControl?.errors?.ngbDate?.maxDate?.maxDate) {
      const ngbMaxDate = fromNgbDate(this.formControl.errors.ngbDate.maxDate.maxDate);
      const maxDate = this.datePipe.transform(ngbMaxDate, 'dd.MM.yyyy');
      return $localize`:@@validation.max-date:Das Datum muss vor oder an dem ${maxDate} liegen.`;
    }

    return ' ';
  }
}
