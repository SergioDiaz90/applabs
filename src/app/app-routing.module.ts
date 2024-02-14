import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CreateProjectComponent } from './components/create-project/create-project.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'createProyect', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
