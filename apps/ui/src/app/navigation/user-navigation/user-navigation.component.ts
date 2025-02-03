import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {OAuthService} from 'angular-oauth2-oidc';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UserDto} from '../../../generated';
import {AppState} from '../../shared/state/app.state';
import {JwtAuthService} from '../../auth/jwt-auth.service';
import {selectUser} from '../../shared/state/data/data.selectors';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html'
})
export class UserNavigationComponent {
  user: UserDto | undefined;

  @Input()
  placement: 'bottom-end' | 'bottom-start' = 'bottom-end';

  constructor(
    private store: Store<AppState>,
    private jwtAuthService: JwtAuthService,
    private oauthService: OAuthService
  ) {
    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed())
      .subscribe((user) => (this.user = user));
  }

  logout() {
    this.jwtAuthService.logout();
  }

  isJwtAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
