import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './site/header/header.component';
import { SiteHeaderComponent } from './site/site-header/site-header.component';
import { MaterialExampleModule } from './material-io.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    CompanyListComponent,
    CompanyInfoComponent,
    CompanyAddComponent,
    SiteHeaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialExampleModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent, MaterialExampleModule],
})
export class AppModule {}
