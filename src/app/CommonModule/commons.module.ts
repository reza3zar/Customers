import { CategoryMenuLeftsideComponent } from './../category-menu-leftside/category-menu-leftside.component';
import { LeftSideComponent } from './../left-side/left-side.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComboComponent } from './bank-combo/bank-combo.component';
import { BrokerComboComponent } from './broker-combo/broker-combo.component';
import { CustomerComboComponent } from './customer-combo/customer-combo.component';
import { CreditCategoryComboComponent } from './credit-category-combo/credit-category-combo.component';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FooterComponent } from '../footer/footer.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { RedirectToLogin } from './redirectToLogin.service';
import { SideNaveMenuComponent } from './side-nave-menu/side-nave-menu.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbSidebarModule, NbMenuModule, NbDialogModule, NbWindowModule, NbToastrModule, NbLayoutModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    GridModule,
    ExcelModule,  InputsModule, LayoutModule, DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    RouterModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule
  ],
  declarations: [
    NotFoundComponent,
    ContentLoaderComponent,
    CreditCategoryComboComponent,
    CustomerComboComponent,
    BrokerComboComponent,
    BankComboComponent,
    FooterComponent,
    LeftSideComponent,
    CategoryMenuLeftsideComponent,
    HomeLayoutComponent,
    SideNaveMenuComponent,


  ],
  exports:[
    NotFoundComponent,
    ContentLoaderComponent,
    CreditCategoryComboComponent,
    CustomerComboComponent,
    BrokerComboComponent,
    BankComboComponent,
    LeftSideComponent,
    FooterComponent,
    CategoryMenuLeftsideComponent,
    HomeLayoutComponent

  ],
  providers:[
    RedirectToLogin
  ]
})
export class CommonsModule { }
