import {createReducer, on} from '@ngrx/store';

import {EmployeeDto, ProjectDto, UserDto} from '../../../../generated';
import {addOrUpdateEmployee, addOrUpdateProject, loadEmployeesDone, loadProjectsDone, setUser} from './data.actions';

export interface DataState {
  user?: UserDto;
  employees: EmployeeDto[];
  projects: ProjectDto[];
}

export const dataFeatureKey = 'data';

const initialAppState: DataState = {
  user: undefined,
  employees: [],
  projects: []
};

export const dataReducer = createReducer(
  initialAppState,
  on(setUser, (state, {user}) => {
    return {
      ...state,
      user: user ? {...user} : undefined
    };
  }),
  on(loadEmployeesDone, (state, {employees}) => {
    return {
      ...state,
      employees: [...employees]
    };
  }),
  on(addOrUpdateEmployee, (state, {employee}) => {
    return {
      ...state,
      employees: [...state.employees.filter((e) => e.id !== employee.id), employee]
    };
  }),
  on(loadProjectsDone, (state, {projects}) => {
    return {
      ...state,
      projects: [...projects]
    };
  }),
  on(addOrUpdateProject, (state, {project}) => {
    return {
      ...state,
      projects: [...state.projects.filter((e) => e.id !== project.id), project]
    };
  })
);
