import {Component} from '@angular/core';

import {Store} from '@ngrx/store';

import {ActivatedRoute} from '@angular/router';
import {AppState} from '../shared/state/app.state';
import {createEmployee, createProject, loadEmployees, loadProjects} from '../shared/state/data/data.actions';
import {EmployeeDto, ProjectDto} from '../../generated';
import {selectEmployees, selectProjects} from '../shared/state/data/data.selectors';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeComponent} from './employee/employee.component';
import {ProjectComponent} from './project/project.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  showIntegrations = false;

  employees: EmployeeDto[] = [];
  projects: ProjectDto[] = [];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.store.dispatch(loadEmployees());
    this.store.dispatch(loadProjects());

    this.store.select(selectEmployees).subscribe((employees) => {
      this.employees = employees;
    });
    this.store.select(selectProjects).subscribe((projects) => {
      this.projects = projects;
    });
  }

  createEmployee() {
    const modalRef = this.modalService.open(EmployeeComponent);

    modalRef.result.then((employee) => {
      this.store.dispatch(createEmployee({employee}));
    });
  }

  createProject() {
    const modalRef = this.modalService.open(ProjectComponent);

    modalRef.result.then((project) => {
      this.store.dispatch(createProject({project}));
    });
  }
}
