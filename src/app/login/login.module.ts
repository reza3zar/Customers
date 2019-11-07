import { LoginLayoutComponent } from './../login-layout/login-layout.component';
import { LoginManagerService } from './../Services/login-manager.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { ThemeModule } from '../@theme/theme.module';

import {
  NbToastrModule,
  NbDialogModule,
  NbLayoutModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

// const routes: Routes = [
// { path: '**', component: LoginComponent },
// { path: '', component: LoginComponent, pathMatch: 'full'  }
// ]


const routes: Routes = [{
  path: '',
  component: LoginLayoutComponent,
  children: [
    {
      path: '**',
      component: LoginComponent,
    },
  ]}];

@NgModule({
  imports: [
    FormsModule,
    ThemeModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbToastrModule.forRoot(),
    CommonModule      ,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    LoginLayoutComponent
  ],
  providers:[
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    LoginManagerService,
  ]
})
export class LoginModule { }
