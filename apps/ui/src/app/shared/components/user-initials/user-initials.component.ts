import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-user-initials',
  template: `<span
    class="rounded py-1 px-2 fs-s bg-primary-100 text-primary-500 fw-semibold d-flex align-items-center justify-content-center font-monospace"
    >{{ initials }}</span
  >`
})
export class UserInitialsComponent implements OnChanges {
  @Input()
  name: string | undefined = '';

  initials = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.initials = this.getUserInitials();
  }

  /**
   * Returns the initials of the user's name with a fallback to the first two characters of the email address if the name is not set.
   */
  getUserInitials() {
    if (this.name === undefined) {
      return '';
    }

    if (this.name === null) {
      return '';
    }

    const cleanedName = this.name.trim();

    if (cleanedName === '') {
      return '';
    }

    const splitName = cleanedName.split(' ');

    if (splitName.length <= 1) {
      return splitName[0].substring(0, 2).toUpperCase();
    }

    // return the first and last name initials (a middle name gets ignored e.g. John Doe Smith -> JS)
    return (splitName[0].substring(0, 1) + splitName[splitName.length - 1].substring(0, 1)).toUpperCase();
  }
}
