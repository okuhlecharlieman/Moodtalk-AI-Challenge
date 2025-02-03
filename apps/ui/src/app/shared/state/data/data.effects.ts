import {Inject, Injectable, LOCALE_ID} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LanguageDto} from '../../../../generated';
import {WINDOW} from '../../../app.config';
import {
  addOrUpdateEmployee,
  addOrUpdateProject,
  createEmployee,
  createProject,
  loadEmployees,
  loadEmployeesDone,
  loadProjects,
  loadProjectsDone,
  networkError,
  setUser,
  setUserRedirectDone
} from './data.actions';
import {PlannerService} from '../../service/planner.service';
import {ToastService} from '../../../toast.service';
import {of, tap} from 'rxjs';

@Injectable()
export class DataEffects {
  networkError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(networkError),
      tap((action) => {
        this.toastService.showError(action.errorInfo);
      })
    )
  );

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      switchMap(() =>
        this.plannerService.getEmployees().pipe(
          map((employees) => loadEmployeesDone({employees})),
          catchError(() =>
            of(networkError({errorInfo: $localize`:@@error.load-employees:Mitarbeiter konnten nicht geladen werden.`}))
          )
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createEmployee),
      switchMap((action) =>
        this.plannerService.createEmployee(action.employee).pipe(
          map((employee) => addOrUpdateEmployee({employee})),
          catchError(() =>
            of(
              networkError({errorInfo: $localize`:@@error.create-employees:Mitarbeiter konnten nicht erstellt werden.`})
            )
          )
        )
      )
    )
  );

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      switchMap(() =>
        this.plannerService.getProjects().pipe(
          map((projects) => loadProjectsDone({projects})),
          catchError(() =>
            of(networkError({errorInfo: $localize`:@@error.load-projects:Projekte konnten nicht geladen werden.`}))
          )
        )
      )
    )
  );

  createProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProject),
      switchMap((action) =>
        this.plannerService.createProject(action.project).pipe(
          map((project) => addOrUpdateProject({project})),
          catchError(() =>
            of(networkError({errorInfo: $localize`:@@error.create-project:Projekt konnten nicht erstellt werden.`}))
          )
        )
      )
    )
  );

  setUserRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUser),
      map((action) => {
        const userLocale = (action.user?.language || LanguageDto.De).toLowerCase();
        if (this.locale.indexOf(userLocale) > -1) {
          // eslint-disable-next-line no-console
          console.info('User locale', userLocale, 'present in current locale', this.locale);
          return setUserRedirectDone();
        }

        // Make sure we have the locale in the current path
        if (this.window.location.href.indexOf('/' + this.locale.substring(0, 2) + '/') > -1) {
          // eslint-disable-next-line no-console
          console.info(
            'Replacing locale',
            this.locale.substring(0, 2),
            'with ',
            userLocale,
            'in',
            this.window.location.href
          );

          // Redirect to the user's language
          this.window.location.href = this.window.location.href.replace(
            '/' + this.locale.substring(0, 2) + '/',
            '/' + userLocale + '/'
          );
        }

        // eslint-disable-next-line no-console
        console.info('Done redirecting for user locale', userLocale, 'Href is now', this.window.location.href);

        return setUserRedirectDone();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private plannerService: PlannerService,
    private toastService: ToastService,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCALE_ID) private locale: string
  ) {}
}
