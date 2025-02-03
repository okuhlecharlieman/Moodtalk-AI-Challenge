import {APP_INITIALIZER, LOCALE_ID, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage} from 'angular-oauth2-oidc';
import {APP_CONFIG, AppConfig} from '../app.config';
import {JwtAuthService} from './jwt-auth.service';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

export function getAuthConfig(config: AppConfig, locale: string): AuthConfig {
  let redirectUri = window.location.origin + '/';
  const addLocaleToRedirectUri =
    config.auth.addLocaleToRedirectUri !== undefined ? config.auth.addLocaleToRedirectUri : true;

  if (addLocaleToRedirectUri) {
    redirectUri += locale.substring(0, 2) + '/';
  }

  return {
    issuer: config.auth.issuer,
    clientId: config.auth.clientId,
    requireHttps: config.auth.requireHttps !== undefined ? config.auth.requireHttps : true,
    responseType: 'code',
    redirectUri: redirectUri,
    scope: 'openid profile email',
    timeoutFactor: 0.75, // Will refresh a token when the previous token is within 25% of expiry
    showDebugInformation: false, // Also requires enabling "Verbose" level in devtools
    clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
    nonceStateSeparator: 'semicolon',
    clockSkewInSec: 60
  };
}

export function getJWTEnabledUrls(config: AppConfig): string[] {
  return [config.api.baseUrl];
}

export function getOAuthModuleConfig(config: AppConfig): OAuthModuleConfig {
  return {
    resourceServer: {
      // we only intercept specific organisational dashboard requests, all other requests will still be cookie based.
      allowedUrls: getJWTEnabledUrls(config),
      sendAccessToken: true
    }
  };
}

export function authAppInitializerFactory(authService: JwtAuthService): () => Promise<void> {
  return () => authService.runInitialLoginSequence();
}

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [JwtAuthService]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [JwtAuthService], multi: true},
        {provide: AuthConfig, useFactory: getAuthConfig, deps: [APP_CONFIG, LOCALE_ID]},
        {provide: OAuthModuleConfig, useFactory: getOAuthModuleConfig, deps: [APP_CONFIG]},
        {provide: OAuthStorage, useFactory: storageFactory}
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
