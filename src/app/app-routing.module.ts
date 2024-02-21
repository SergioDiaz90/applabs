import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'createProyect', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'createRequest', component: CreateRequestComponent, canActivate: [AuthGuard] },
  { path: 'createTest', component: CreateTestComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
