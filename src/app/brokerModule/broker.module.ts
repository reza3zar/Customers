import { ShareComponentModule } from './../shareComponentModule/share-component.module';

import { CommonsModule } from "./../CommonModule/commons.module";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SlideInOutModule } from "../SlideInOutModule/slide-in-out.module";
import { GridModule, ExcelModule } from "@progress/kendo-angular-grid";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { BrokerRoutingModule } from "./broker-routing.module";
import { InteriorIndividualRequestComponent } from './interior-individual-request/interior-individual-request.component';
import { RequestsComponent } from './requestsManagement/requests/requests.component';
import { RequestBarComponent } from './requestsManagement/request-bar/request-bar.component';
import { CreateRequestComponent } from './requestsManagement/createRequest/create-request/create-request.component';
import { IMaskModule } from 'angular-imask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifyManagement } from '../shared/NotifyManagement';
import { NbButtonModule, NbIconModule, NbTooltipModule, NbDialogModule, NbCardModule, NbProgressBarModule } from '@nebular/theme';
import { AllCustomerManagementComponent } from './all-customer-management/all-customer-management.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


@NgModule({
  imports: [ 
    CommonModule,
    BrokerRoutingModule,
    SlideInOutModule,
    GridModule,
    ExcelModule,
    InputsModule,
    LayoutModule,
    DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    FormsModule,
    InputsModule,
    ShareComponentModule,
    IMaskModule,
    FontAwesomeModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbCardModule,
    NbProgressBarModule,
    NbDialogModule.forRoot(),
    PDFExportModule

  ],
  declarations: [
    InteriorIndividualRequestComponent,
    RequestsComponent,
    RequestBarComponent,
    CreateRequestComponent,
    AllCustomerManagementComponent,

  ],
  providers:[
    NotifyManagement
  ],
  entryComponents: [],
  
  
})
export class BrokerModule { }
