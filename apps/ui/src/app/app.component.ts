import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from '../generated';
import { UserDto } from '../generated';
import { Observable } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

export type SupportedLanguage = 'de' | 'fr' | 'it' | 'en';

export const supportedLanguages: SupportedLanguage[] = ['de', 'fr', 'it', 'en'];

export const supportedLanguageToLanguageDto: Record<SupportedLanguage, Language> = {
  de: Language.De,
  fr: Language.Fr,
  it: Language.Fr,
  en: Language.En
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;
  user: UserDto | undefined;
  companyLogo: string;

  constructor(private offcanvasService: NgbOffcanvas) {
    // Use a valid image URL or base64 string
    this.companyLogo = 'https://static.moodtalk.ch/logo.svg';
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  openMobileNav(content: any) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
