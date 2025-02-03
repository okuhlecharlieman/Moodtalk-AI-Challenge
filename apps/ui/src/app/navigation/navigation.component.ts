import { Component, EventEmitter, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { JwtAuthService } from "../auth/jwt-auth.service";
import { selectUser } from "../shared/state/data/data.selectors";
import { AppState } from "../shared/state/app.state";
import { UserDto } from "../../generated";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  @Output()
  navItemClicked: EventEmitter<void> = new EventEmitter<void>();

  user: UserDto | undefined;
  isJwtAuthenticated = false;

  currentUrl: string = "";
  constructor(
    private router: Router,
    private jwtAuthService: JwtAuthService,
    private store: Store<AppState>,
  ) {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        this.currentUrl = (event as NavigationEnd).url;
      });

    this.store
      .select(selectUser)
      .pipe(takeUntilDestroyed())
      .subscribe((user) => (this.user = user));

    this.jwtAuthService.isAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (isAuthenticated) => (this.isJwtAuthenticated = isAuthenticated),
      );
  }
}
