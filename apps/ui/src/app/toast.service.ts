import { Injectable } from "@angular/core";
import { BootstrapIcon } from "./shared/bootstrap-icons";

export interface Toast {
  text: string;
  icon?: BootstrapIcon;
  classname?: string;
  delayInMs?: number;
}

@Injectable({ providedIn: "root" })
export class ToastService {
  toasts: Toast[] = [];

  private show(toast: Toast) {
    this.toasts.push(toast);
  }

  showSuccess(
    text: string,
    delayInMs: number = 5000,
    icon: BootstrapIcon | undefined = "bi-check-circle-fill",
  ) {
    this.show({
      text,
      delayInMs,
      icon,
      classname:
        "px-3 py-1 bg-primary-500 text-white fw-semibold cursor-pointer",
    });
  }

  showError(
    text: string,
    delayInMs: number = 5000,
    icon: BootstrapIcon | undefined = "bi-x-circle-fill",
  ) {
    this.show({
      text,
      delayInMs,
      icon,
      classname: "px-3 py-1 bg-red-600 text-white fw-semibold cursor-pointer",
    });
  }

  showWarning(
    text: string,
    delayInMs: number = 5000,
    icon: BootstrapIcon | undefined = "bi-x-circle-fill",
  ) {
    this.show({
      text,
      delayInMs,
      icon,
      classname:
        "px-3 py-1 bg-yellow-600 text-white fw-semibold cursor-pointer",
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
