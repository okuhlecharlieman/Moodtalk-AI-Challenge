import {InjectionToken} from '@angular/core';

export type AppConfig = {
  auth: {
    issuer: string;
    clientId: string;
    requireHttps?: boolean;
    addLocaleToRedirectUri?: boolean;
  };
  api: {
    baseUrl: string;
  };
  helpCenter: {
    enabled: boolean;
    url?: string;
    supportedLocales?: string[];
  };
};

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const WINDOW = new InjectionToken<Window>('Global window object', {
  factory: () => window
});
