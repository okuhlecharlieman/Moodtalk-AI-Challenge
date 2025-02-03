import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {AuthGuardWithForcedLogin} from './auth/forced-login.guard';
import {NoUserFoundComponent} from './auth/no-user-found/no-user-found.component';
import {PlannerComponent} from './planner/planner.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'planner'
  },
  {
    path: 'no-user-found',
    pathMatch: 'full',
    component: NoUserFoundComponent
  },
  {
    path: 'planner',
    pathMatch: 'full',
    component: PlannerComponent,
    canActivate: [AuthGuardWithForcedLogin]
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
    canActivate: [AuthGuardWithForcedLogin]
  }
];

const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  bindToComponentInputs: true,
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
