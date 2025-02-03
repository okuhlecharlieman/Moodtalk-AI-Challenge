import {Component, Input} from '@angular/core';
import {BootstrapIcon} from '../../bootstrap-icons';

export type ButtonType = 'submit' | 'button' | 'reset';
export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'gray'
  | 'gray-outline'
  | 'blue'
  | 'blue-outline'
  | 'red'
  | 'red-outline'
  | 'white-outline'
  | 'yellow'
  | 'yellow-outline';

export type ButtonFormat = 'normal' | 'pill';
export type ButtonSize = 'large' | 'normal' | 'small';
export type IconPosition = 'start' | 'end' | 'icon-only';

const baseBtnClasses: string[] = ['btn', 'fw-semibold'];

const variantClasses: Record<ButtonVariant, string[]> = {
  primary: ['btn-primary-500'],
  'primary-outline': ['btn-outline-primary-500'],
  gray: ['btn-gray-200'],
  'gray-outline': ['btn-outline-gray-300', 'text-gray-700'],
  blue: ['btn-blue-500'],
  'blue-outline': ['btn-outline-blue-500'],
  red: ['btn-red-500', 'text-white'],
  'red-outline': ['btn-outline-red-500'],
  'white-outline': ['btn-outline-white', 'text-white', 'border-white'],
  yellow: ['btn-yellow-500', 'text-white'],
  'yellow-outline': ['btn-outline-yellow-500', 'text-white-hover']
};

const typeClasses: Record<ButtonFormat, Record<ButtonSize | 'shared', string[]>> = {
  normal: {large: [], normal: ['px-5'], small: ['px-3', 'py-1'], shared: []},
  pill: {large: ['px-6'], normal: ['px-5'], small: ['px-4', 'fs-xs', 'py-2'], shared: ['rounded-5']}
};

const sizeClasses: Record<ButtonSize, string[]> = {
  large: ['btn-lg', 'fs-s'],
  normal: ['fs-s'],
  small: ['btn-sm', 'fs-s']
};

const iconClasses: Record<ButtonSize, Record<IconPosition | 'shared', string[]>> = {
  large: {start: ['me-5'], end: ['ms-5'], 'icon-only': ['m-0'], shared: []},
  normal: {start: ['me-2'], end: ['ms-2'], 'icon-only': ['m-0'], shared: []},
  small: {start: ['me-1'], end: ['ms-1'], 'icon-only': ['m-0'], shared: []}
};

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html'
})
export class ButtonComponent {
  /**
   * Can be used to add additional css classes to the `button` element
   */
  @Input()
  additionalClasses: string[] = [];

  /**
   * Can be used to add additional css classes to the `i` element of the icon
   */
  @Input()
  additionalIconClasses: string[] = [];

  /**
   * The type can be used to define a button that can be used in a form (type = `submit`)
   *
   * Defaults to `button`
   */
  @Input()
  type: ButtonType = 'button';

  /**
   * The variant defines the visual apperance of the button.
   */
  @Input()
  variant: ButtonVariant = 'primary';

  /**
   * Defines whether the button is rendered with wider border radius (`pill`) or as a normal button with a smaller border radius
   */
  @Input()
  format: ButtonFormat = 'normal';

  @Input()
  size: ButtonSize = 'normal';

  @Input()
  icon!: BootstrapIcon | undefined;

  /**
   * Defines whether the icon is rendered before or after the button content
   */
  @Input()
  iconPosition: IconPosition = 'start';

  @Input()
  disabled = false;

  /**
   * Can be used to set autofocus on a button in a modal dialog (see https://ng-bootstrap.github.io/#/components/modal/examples#focus)
   */
  @Input()
  ngbAutoFocus = false;

  /**
   * Shows a tooltip when the button is disabled. This can be used to show an information to a user why a button is disabled
   */
  @Input()
  disabledToolTip = '';

  ngClassesBtn(): string {
    const classes: string[] = [
      ...baseBtnClasses,
      ...sizeClasses[this.size],
      ...variantClasses[this.variant],
      ...typeClasses[this.format][this.size],
      ...typeClasses[this.format]['shared'],
      ...this.additionalClasses
    ];

    return classes.join(' ');
  }

  ngClassesIcon(): string {
    const classes: string[] = [
      ...iconClasses[this.size][this.iconPosition],
      ...iconClasses[this.size]['shared'],
      ...this.additionalIconClasses
    ];

    if (this.icon) {
      classes.push(this.icon);
    }

    return classes.join(' ');
  }

  tooltip(): string {
    if (!this.disabled) {
      return '';
    }

    return this.disabledToolTip;
  }
}
