import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, filter, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {PlannerStub, UserDto} from '../../generated';
import {AppState} from '../shared/state/app.state';
import {setUser} from '../shared/state/data/data.actions';

export type AuthProfile = {
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  name?: string;
  preferred_username?: string;
  sub?: string;
  sid?: string;
  locale?: string;
};

/**
 * This class is mainly copied from https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards
 */
@Injectable({providedIn: 'root'})
export class JwtAuthService {
  private isInitializedSubject$ = new BehaviorSubject<boolean>(false);
  public isInitialized$ = this.isInitializedSubject$.asObservable();

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  private userSubject$ = new BehaviorSubject<UserDto | undefined>(undefined);
  public user$ = this.userSubject$.asObservable();

  private selectedOrgIdSubject$ = new BehaviorSubject<string>('');

  private selectedTeamIdSubject$ = new BehaviorSubject<string>('');

  private navigateToLoginPage() {
    this.login();
  }

  constructor(
    private authConfig: AuthConfig,
    private oauthService: OAuthService,
    private plannerStub: PlannerStub,
    private router: Router,
    private store: Store<AppState>
  ) {
    // Store user in RXJS state
    this.userSubject$.subscribe((user) => this.store.dispatch(setUser({user})));

    // THe following cross-tab communication of fresh access tokens works usually in practice,
    // but if you need more robust handling the community has come up with ways to extend logic
    // in the library which may give you better mileage.
    //
    // See: https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/issues/2
    //
    // Until then we'll stick to this:
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

      if (!this.oauthService.hasValidAccessToken()) {
        this.navigateToLoginPage();
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
    });

    this.isInitialized$.subscribe((isInitialized) => {
      if (isInitialized) {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      }
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe(() => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(filter((e) => ['token_refresh_error'].includes(e.type)))
      .subscribe(() => this.navigateToLoginPage());
  }

  public assertLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$.pipe(
      filter((isAuthenticated) => isAuthenticated),
      take(1)
    );
  }

  public runInitialLoginSequence(): Promise<void> {
    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    // currently configured:
    this.oauthService.setupAutomaticSilentRefresh();
    return this.oauthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          let stateUrl = this.oauthService.state;
          if (!stateUrl.startsWith('/')) {
            stateUrl = decodeURIComponent(stateUrl);
          }
          this.router.navigateByUrl(stateUrl);
        }
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  public loadUserAndFinishLoginSequence(): void {
    this.oauthService
      .tryLogin()
      .then(() => this.loadUser().subscribe())
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  public loadUser(): Observable<boolean> {
    return this.plannerStub.getUser().pipe(
      map((response) => {
        this.userSubject$.next(response);
        this.isInitializedSubject$.next(true);
        this.isDoneLoadingSubject$.next(true);
        return true;
      }),
      catchError(() => {
        this.isDoneLoadingSubject$.next(true);
        return of(false);
      })
    );
  }

  public login(targetUrl?: string, params?: object) {
    // Note: before version 9.1.0 of the library you needed to
    // call encodeURIComponent on the argument to the method.
    this.oauthService.initLoginFlow(targetUrl || this.router.url, params);
  }

  public logout(redirectUri: string | undefined = undefined): Promise<any> {
    if (redirectUri) {
      return this.oauthService.revokeTokenAndLogout({
        post_logout_redirect_uri: redirectUri
      });
    }
    return this.oauthService.revokeTokenAndLogout({
      post_logout_redirect_uri: this.authConfig.redirectUri
    });
  }
}
