import {Inject, Injectable, LOCALE_ID} from '@angular/core';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
  EmployeeDto,
  EmployeeProperties,
  LanguageDto,
  PlannerStub,
  ProjectDto,
  ProjectProperties
} from '../../../generated';
import {JwtAuthService} from '../../auth/jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  constructor(
    private plannerStub: PlannerStub,
    private authService: JwtAuthService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  public removeEmployee(email: string): Observable<void> {
    // return this.authService.assertLoggedIn().pipe(switchMap(() => this.moodtalkStub.removeEmployee(email)));
    return of(undefined);
  }

  putLanguage(lang: LanguageDto): Observable<void> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.putLanguage(lang)));
  }

  getEmployees(): Observable<EmployeeDto[]> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.getEmployees()));
  }

  createEmployee(properties: EmployeeProperties): Observable<EmployeeDto> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.createEmployee(properties)));
  }

  updateEmployee(id: string, properties: EmployeeProperties): Observable<EmployeeDto> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.updateEmployee(id, properties)));
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.getProjects()));
  }

  createProject(properties: ProjectProperties): Observable<ProjectDto> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.createProject(properties)));
  }

  updateProject(id: string, properties: ProjectProperties): Observable<ProjectDto> {
    return this.authService.assertLoggedIn().pipe(switchMap(() => this.plannerStub.updateProject(id, properties)));
  }
}
