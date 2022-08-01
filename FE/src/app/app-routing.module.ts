import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'company', component: CompanyListComponent, canActivate:[AuthGuard]},
  {path:'company/:id', component: CompanyListComponent, canActivate:[AuthGuard]},
  {path:'company-add', component: CompanyAddComponent, canActivate:[AuthGuard]},
  {path:'company-add/:id', component: CompanyAddComponent, canActivate:[AuthGuard]},
  {path:'', redirectTo:'/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
