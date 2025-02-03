import { Component } from "@angular/core";
import {
  SupportedLanguage,
  supportedLanguages,
  supportedLanguageToLanguageDto,
} from "../app.component";
import { PlannerService } from "../shared/service/planner.service";

@Component({
  selector: "app-language-switcher",
  templateUrl: "./language-switcher.component.html",
})
export class LanguageSwitcherComponent {
  defaultLanguage: SupportedLanguage = "de";
  languages: SupportedLanguage[] = supportedLanguages;

  constructor(private plannerService: PlannerService) {}

  getCurrentLang(): SupportedLanguage {
    const currentLocation = window.location.href;
    const foundLanguage = this.languages.filter(
      (lang) => currentLocation.indexOf("/" + lang + "/") >= 0,
    );

    if (foundLanguage.length === 0) {
      return this.defaultLanguage;
    }

    return foundLanguage[0];
  }

  switchLang(lang: SupportedLanguage): void {
    const currentLocation = window.location.href;
    const currentLang = this.getCurrentLang();

    if (currentLang === lang) {
      return;
    }

    this.plannerService
      .putLanguage(supportedLanguageToLanguageDto[lang])
      .subscribe(() => {
        const idx = currentLocation.indexOf("/" + currentLang + "/");
        if (idx >= 0) {
          window.location.href = currentLocation.replace(
            "/" + currentLang + "/",
            "/" + lang + "/",
          );
        }
      });
  }
}
