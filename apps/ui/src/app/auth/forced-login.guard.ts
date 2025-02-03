import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

import { OAuthService } from "angular-oauth2-oidc";
import { JwtAuthService } from "./jwt-auth.service";

export const AuthGuardWithForcedLogin: CanActivateFn = (
  _next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean | UrlTree> => {
  const authService = inject(JwtAuthService);

  const oauthService = inject(OAuthService);
  const router = inject(Router);

  return authService.isDoneLoading$.pipe(
    filter((isDone) => isDone),
    map((_) => {
      const isAuthenticated = oauthService.hasValidAccessToken();
      if (isAuthenticated) {
        return isAuthenticated;
      }

      // Not authenticated. Redirect to login page
      const loginHint = _next.queryParams["login_hint"];
      if (loginHint) {
        // Login hint given, try to login with hint
        authService.login(state.url, { login_hint: loginHint });
      } else {
        // No login hint given, just login
        authService.login(state.url);
      }
      return false;
    }),
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        return of(isAuthenticated);
      }

      return authService.user$;
    }),
    map((user) => {
      if (user === false) {
        return false;
      }
      if (user === undefined) {
        // No user found, redirect to no user found page
        return router.parseUrl("/no-user-found");
      }

      return true;
    }),
  );
};
