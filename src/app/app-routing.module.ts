import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutingModule } from './components/components-routing.module';
import { LoginLayoutRoutes } from './login/login-routing.module';

const routes: Routes = [

  ...LoginLayoutRoutes,
  ...ComponentsRoutingModule,
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }