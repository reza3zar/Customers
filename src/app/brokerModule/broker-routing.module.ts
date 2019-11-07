import { AllCustomerManagementComponent } from './all-customer-management/all-customer-management.component';
import { RequestsComponent } from './requestsManagement/requests/requests.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { HomeLayoutComponent } from '../CommonModule/home-layout/home-layout.component';
import { InteriorIndividualPrintComponent } from '../shareComponentModule/interior-individual-print/interior-individual-print.component';


const routes: Routes = [


  {
    path: "",
    component: HomeLayoutComponent,
    children: [ {path: '', component:  RequestsComponent},
    {path: 'request', component:  RequestsComponent},
    {path: 'allCustomer', component:  AllCustomerManagementComponent},
    {path: 'print', component:  InteriorIndividualPrintComponent},]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]

})
export class BrokerRoutingModule {
}
