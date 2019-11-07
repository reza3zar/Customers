import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
// { path: 'login', component: LoginLayoutComponent,children: [
//   { path: "", component: LoginComponent },
//   { path: "**", component: LoginComponent },

//   ]

// },
const routes: Routes = [

  {path:'login',
  loadChildren:()=>import('./login/login.module')
  .then(m=>m.LoginModule)},


  {path:'exchange',
  loadChildren:()=>import('././exchange-module/exchange-module.module')
  .then(m=>m.ExchangeModuleModule)},
  
  {path:'broker',
  loadChildren:()=>import('././brokerModule/broker.module')
  .then(m=>m.BrokerModule)},

  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
    
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'broker', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
