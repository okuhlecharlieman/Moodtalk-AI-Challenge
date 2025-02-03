import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {JwtAuthService} from '../jwt-auth.service';
import {AppState} from '../../shared/state/app.state';
import {selectUser} from '../../shared/state/data/data.selectors';

@Component({
  selector: 'app-no-user-found',
  templateUrl: './no-user-found.component.html'
})
export class NoUserFoundComponent {
  constructor(
    private router: Router,
    private jwtAuthService: JwtAuthService,
    private store: Store<AppState>
  ) {
    // Subscribe to the isAuthenticated$ observable to track the authentication status
    this.jwtAuthService.isAuthenticated$
      .pipe(takeUntilDestroyed(), distinctUntilChanged())
      .subscribe((isAuthenticated) => {
        // Authentication status has changed
        if (isAuthenticated) {
          // User is authenticated
          // Check if user is loaded
          store
            .select(selectUser)
            .pipe(
              take(1),
              switchMap((user) => {
                if (user) {
                  return of(true);
                }

                // User not loaded, try to load the user
                return jwtAuthService.loadUser();
              })
            )
            .subscribe((result) => {
              if (result) {
                // User was loaded successfully, navigate to the inbox
                this.router.navigate(['/dashboard']);
              }
            });
        }
      });
  }

  goToLogin(): void {
    this.jwtAuthService.logout().then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
