import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { ResultsComponent } from './results/results.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'public-profile',
    component: PublicProfileComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
