import { brokerRequest } from './../../../Models/CustomersModels/Common/brokerRequest';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SidebarService } from '../../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../../in-active-background.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { BrokerRequestsService } from '../../../services/broker-requests.service';
import * as moment from "jalali-moment";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { InvoiceRow } from '../../../shareComponentModule/interior-individual-print/interior-individual-print.component';
import { NotifyManagement } from '../../../shared/NotifyManagement';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";
  faCoffee = faCoffee;
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  public pageSize = 14;
  public skip = 0;
  public state = false;
  private dataRes = [];
  public result;
  public filter: CompositeFilterDescriptor;
  public opened: boolean = false;

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  brokerRequestsSubscriber: Subscription;

  customerType='';

  public selectedRequestItemResult: brokerRequest = null;

  constructor(
    private brokerRequests:BrokerRequestsService,
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private windowService: NbWindowService,
    private notify: NotifyManagement,
     ) {
     }

    

  ngOnInit() {


    this.gridData = {
      data: this.dataRes,
      total: 0
    };

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
         setTimeout(() => {
          this.typeOpereation = "none";
        }, 1000);
      }
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });
    this.refreshRequests();
    }

    refreshAllRequest(){
      this.refreshRequests();
    }

    refreshRequests(){
      this.loadingGrid = true;

      this.brokerRequestsSubscriber = this.brokerRequests.getBrokerRequests().subscribe(result=>
        {
          this.dataRes = result.items as brokerRequest[];
          this.gridData.data = this.dataRes;
          try {
            this.gridData.total = this.dataRes.length;
          } catch (ex) {
            console.error(ex);
          }
          this.loadItems();
          this.loadingGrid = false;
        })
    }


    brokerRequestsSendRequestSubscriber: Subscription;
    brokerRequestsDeleteRequestSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.brokerRequestsSubscriber !== undefined) {
      this.brokerRequestsSubscriber.unsubscribe();
    }
    if (this.brokerRequestsSendRequestSubscriber !== undefined) {
      this.brokerRequestsSendRequestSubscriber.unsubscribe();
    }
    if (this.brokerRequestsDeleteRequestSubscriber !== undefined) {
      this.brokerRequestsDeleteRequestSubscriber.unsubscribe();
    }
  }

  public sendRequestShowDialog() {
    if (
      this.selectedRequestItemResult == null ||
      this.selectedRequestItemResult === undefined
    )
      return;
    this.opened = true;
  }

  public close(status) {
 
  }

  public allData(): ExcelExportData {
    var res = this.dataRes;
    const result: ExcelExportData = {
      data: res
    };

    return result;
  }

  showDetails() {
    this.disableShowBtn = true;
    this.panelTypeEnum = "showMode";
    this.typeOpereation = "showDetail";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  public createNewRequest(): void {
    this.typeOpereation = "addNewRequest";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    var resultSort = this.dataRes.slice(this.skip, this.skip + this.pageSize);
    this.gridData = {
      data: resultSort,
      total: this.dataRes.length
    };
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadAllItems();
  }

  public selected(e) {
    let selectedCredit = new brokerRequest();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as brokerRequest)
      : new brokerRequest(); 

  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadAllItems();
  }
  private loadAllItems(): void {
    var resultSort = orderBy(this.dataRes, this.sort);
    var resultFilter = filterBy(resultSort, this.filter);
    this.gridData = {
      data: resultFilter,
      total: resultFilter.length
    };
  }
  public onCellClick(e: any): void {
    if (e.type === "contextmenu") {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
    }
  }
 

  checkIsSelectedRow(itemId: number,isOperational:boolean=true) {

    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return true;

      if(!isOperational && this.selectedRequestItemResult.requestStatus.id!=1 && this.selectedRequestItemResult.id == itemId 
        && this.selectedRequestItemResult.responseType.id!=3/*inprogress */)
      return false;

    if (this.selectedRequestItemResult.id == itemId){
        if(this.selectedRequestItemResult.requestStatus.id!=1 &&
          (this.selectedRequestItemResult.responseType==null || this.selectedRequestItemResult.responseType==undefined || this.selectedRequestItemResult.responseType.id==3 || this.selectedRequestItemResult.responseType.id==1))
          return true;
      return false;
    }
    return true;
  }


  checkIsSelectedRowForPrint(itemId: number){
    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return true;

      if( this.selectedRequestItemResult.id == itemId )
         return false;

    return true;
  }


  SaveRequestsFake(request):void{

    console.log(request)
    this.sidebarService.toggle('out');
    this.loadingGrid = true;
    this.refreshRequests();
    // this.dataRes = this.dataRes as brokerRequest[];
    // var newRequest=(new brokerRequest);
    // newRequest.requestName=request.personalDetails._firstName+' '+request.personalDetails._lastName;
    // this.dataRes[this.dataRes.length+1] =newRequest;

    // setTimeout( () => {
    //   var newRequest=(new Object);
    //   if(this.customerType=='InteriorIndividual'){
    //     newRequest['name']=request.personalDetails.firstName+' '+request.personalDetails.lastName;
    //     newRequest['nationality']=new Object;
    //     newRequest['nationality'].name=request.personalDetails.nationality.name;
    //     newRequest['id']= Math.floor(Math.random() * 60) + 1 ;
    //     newRequest['customerType']=new Object;
    //     newRequest['customerType'].name='حقیقی';
    //     newRequest['createDate']=moment(new Date().toLocaleString() ).format('jYYYY/jM/jD HH:mm:ss');
    //     newRequest['requestStatus']=new Object;
    //     newRequest['requestStatus'].name='پیشنویس';
    //     newRequest['requestType']=new Object;
    //     newRequest['requestType'].name='افزودن مشتری جدید';
    //     newRequest['responseStatus']=new Object;
    //     newRequest['responseStatus'].name='ارسال نشده';
    //     this.dataRes[0] =newRequest;
    //     this.gridData.data = this.dataRes;
    //   }
    //   if(this.customerType=='InteriorLegal'){
    //     newRequest['name']=request.legalbasicInformation.companyName;
    //     newRequest['nationality']=new Object;
    //     newRequest['nationality'].name=request.legalbasicInformation.nationality.name;
    //     newRequest['id']= Math.floor(Math.random() * 60) + 1 ;
    //     newRequest['customerType']=new Object;
    //     newRequest['customerType'].name='حقوقی';
    //     newRequest['createDate']=moment(new Date().toLocaleString() ).format('jYYYY/jM/jD HH:mm:ss');
    //     newRequest['requestStatus']=new Object;
    //     newRequest['requestStatus'].name='پیشنویس';
    //     newRequest['requestType']=new Object;
    //     newRequest['requestType'].name='افزودن مشتری جدید';
    //     newRequest['responseStatus']=new Object;
    //     newRequest['responseStatus'].name='ارسال نشده';
    //     this.dataRes[1] =newRequest;
    //     this.gridData.data = this.dataRes;
    //   }



    //   try {

    //   } catch (ex) {
    //     console.error(ex);
    //   }
    //   this.loadingGrid = false; }, 5000 );

  }

  SetCustomerType(customerType):void{
    this.customerType=customerType;
    console.log(customerType);
  }


  updateRequests(request:any){
    // this.gridData.data.push(request);
    this.refreshAllRequest();
  }
  // TO DO this.selectedRequestItemResult.requestType
  sendRequestToServer(){
    this.checkIsSelectedRow(this.selectedRequestItemResult.id);
    this.brokerRequestsSendRequestSubscriber=  this.brokerRequests.sendDraftRequestToServer(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
      true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
          console.log(this.result);
          this.refreshRequests();
    })
  }

  deleteSelectedRequest(){
 
    this.brokerRequestsDeleteRequestSubscriber=  this.brokerRequests.deleteDraftRequest(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
      true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
          console.log(this.result);
          this.refreshRequests();
    }) 
  }
// To DO Memory Leak
//Error watingForGetPdf set false
  watingForGetPdf=false;
  exportPdf(){
    this.watingForGetPdf=true;
    this.brokerRequests.getKeyOfIndividualInteriorForExportPdf(this.selectedRequestItemResult.id).subscribe(result =>{

          this.brokerRequests.getPdfOfRequestByKey(result).subscribe(resultPdf =>{
          this.watingForGetPdf=false;
            console.log(resultPdf)
          },err=>{
                  this.watingForGetPdf=false;
                  this.notify.showErrorMessageBoxWithDuplicate("خطا در دریافت فایل پرینت!");

          })
         },error=>{
                  this.notify.showErrorMessageBoxWithDuplicate("خطا در دریافت کلید فایل پرینت!");
                  this.watingForGetPdf=false;

             }) 
  }
 

  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;
  showDescription() {
    this.windowService.open(
      this.contentTemplate,
      { title: 'توضیحات درخواست', context: { text: this.selectedRequestItemResult.responseDescription } },
    );

    // this.dialogService.open(ShowRequestDescriptionComponent);

  
  }

  @ViewChild('printTemplate', { static: true }) printTemplate: TemplateRef<any>;
  printForm(){
    this.windowService.open(
      this.printTemplate,
      { title: 'پرینت' },
    );
  }
}


