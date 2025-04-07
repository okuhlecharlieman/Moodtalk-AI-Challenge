import { InjectionToken, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDto {
  id: string;
  email: string;
  language: string;
  company: {
    id: string;
    name: string;
  };
}

export interface EmployeeDto {
  id: string;
  name: string;
}

export interface EmployeeProperties {
  name: string;
}

export interface ProjectDto {
  id: string;
  name: string;
  color: string;
}

export interface ProjectProperties {
  name: string;
  color: string;
}

export enum Language {
  De = 'DE',
  Fr = 'FR',
  It = 'IT',
  En = 'EN'
}

export interface LanguageDto {
  code: Language;
  name: string;
}

export interface PlannerStub {
  getUser(): Observable<UserDto>;
  putLanguage(lang: Language): Observable<void>;
  getEmployees(): Observable<EmployeeDto[]>;
  createEmployee(properties: EmployeeProperties): Observable<EmployeeDto>;
  updateEmployee(id: string, properties: EmployeeProperties): Observable<EmployeeDto>;
  getProjects(): Observable<ProjectDto[]>;
  createProject(properties: ProjectProperties): Observable<ProjectDto>;
  updateProject(id: string, properties: ProjectProperties): Observable<ProjectDto>;
}

export const PLANNER_STUB = new InjectionToken<PlannerStub>('PlannerStub');

export class Configuration {
  constructor(config: {basePath: string; withCredentials: boolean}) {}
}

@NgModule({
  imports: [],
  providers: []
})
export class ApiModule {
  static forRoot(): any {
    return {
      ngModule: ApiModule,
      providers: []
    };
  }
}
