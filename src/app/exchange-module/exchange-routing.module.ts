import { BehinyabInfoComponent } from './behinyab-info/behinyab-info.component';
import { InquiryDepositoryByNationalIDComponent } from './inquiry-depository-by-national-id/inquiry-depository-by-national-id.component';
import { InquiryCellInfoLegalComponent } from './inquiry-cell-info-legal/inquiry-cell-info-legal.component';
import { InquiryCellInfoComponent } from './inquiry-cell-info/inquiry-cell-info.component';
import { InquiryFidaLegalPersonComponent } from './inquiry-fida-legal-person/inquiry-fida-legal-person.component';
import { InquiryLegalPersonComponent } from './inquiry-legal-person/inquiry-legal-person.component';
import { InquiryTaxCustomersComponent } from './inquiry-tax-customers/inquiry-tax-customers.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { HomeLayoutComponent } from '../CommonModule/home-layout/home-layout.component';
import { AllRequestsManagementComponent } from './all-requests-management/all-requests-management.component';
import { InquiryDepositoryComponent } from './inquiry-depository/inquiry-depository.component';
import { InquiryFidaNaturalPersonComponent } from './inquiry-fida-natural-person/inquiry-fida-natural-person.component';
import { TsetmcCustomerInfoComponent } from './tsetmc-customer-info/tsetmc-customer-info.component';
import { SupervisorManagementOfRequestsComponent } from './supervisor-management-of-requests/supervisor-management-of-requests.component';
import { AllCustomersManagementComponent } from './all-customers-management/all-customers-management.component';


const routes: Routes = [


  {
    path: "",
    component: HomeLayoutComponent,
    children: [ {path: '', component:  AllRequestsManagementComponent},
    {path: 'Inquiry', component:  InquiryTaxCustomersComponent},
    {path: 'InquiryCellInfoIndividual', component:  InquiryCellInfoComponent},
    {path: 'InquiryCellInfoLegal', component:  InquiryCellInfoLegalComponent},
    {path: 'InquiryDepository', component:  InquiryDepositoryComponent},
    {path: 'InquiryDepositoryByNationalId', component:  InquiryDepositoryByNationalIDComponent},
    {path: 'InquiryFidaLegalPerson', component:  InquiryFidaLegalPersonComponent},
    {path: 'InquiryFidaNaturalPerson', component:  InquiryFidaNaturalPersonComponent},
    {path: 'InquiryLegalPerson', component:  InquiryLegalPersonComponent},
    {path: 'exchange/InquiryBehinyabInfo', component:  BehinyabInfoComponent},
    {path: 'exchange/InquiryEx14Code', component:  TsetmcCustomerInfoComponent},
    {path: 'requestOfBrokers', component:  AllRequestsManagementComponent},
    {path: 'supervisorManagementRequests', component:  SupervisorManagementOfRequestsComponent},
    {path: 'allCustomer', component:  AllCustomersManagementComponent},

  ]
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
export class ExchangeRoutingModule {
}
