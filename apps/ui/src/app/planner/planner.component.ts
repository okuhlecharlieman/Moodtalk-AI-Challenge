import {Component, computed, signal, WritableSignal} from '@angular/core';

import {Store} from '@ngrx/store';
import {AppState} from '../shared/state/app.state';
import {loadEmployees, loadProjects} from '../shared/state/data/data.actions';
import {EmployeeDto, ProjectDto} from '../../generated';
import {selectEmployees, selectProjects} from '../shared/state/data/data.selectors';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html'
})
export class PlannerComponent {
  employees: EmployeeDto[] = [];
  projects: ProjectDto[] = [];

  currentDate = new Date();

  constructor(
    private store: Store<AppState>,
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

  previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
  }

  nthDayOfWeek = (n: number) => {
    const cd = this.currentDate;
    const d = new Date(Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 1 - dayNum);
    d.setUTCDate(d.getUTCDate() + n);
    return d;
  };

  getWeekNumber(): number {
    const cd = this.currentDate;
    const d = new Date(Date.UTC(cd.getFullYear(), cd.getMonth(), cd.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
}
