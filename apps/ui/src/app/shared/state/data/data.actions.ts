import {createAction, props} from '@ngrx/store';
import {EmployeeDto, EmployeeProperties, ProjectDto, ProjectProperties, UserDto} from '../../../../generated';

export const setUser = createAction('Set User [Direct]', props<{user: UserDto | undefined}>());
export const setUserRedirectDone = createAction('Set User Redirect Done');

export const loadEmployees = createAction('Load Employees');
export const loadEmployeesDone = createAction('Load Employees [Done]', props<{employees: EmployeeDto[]}>());
export const createEmployee = createAction('Create Employee', props<{employee: EmployeeProperties}>());
export const updateEmployee = createAction('Update Employee', props<{id: string; employee: EmployeeProperties}>());
export const addOrUpdateEmployee = createAction('Add or update Employee', props<{employee: EmployeeDto}>());

export const loadProjects = createAction('Load Projects');
export const loadProjectsDone = createAction('Load Projects [Done]', props<{projects: ProjectDto[]}>());
export const createProject = createAction('Create Project', props<{project: ProjectProperties}>());
export const updateProject = createAction('Update Project', props<{id: string; project: ProjectProperties}>());
export const addOrUpdateProject = createAction('Add or update Project', props<{project: ProjectDto}>());

export const networkError = createAction('Network Error occurred', props<{errorInfo: string}>());
