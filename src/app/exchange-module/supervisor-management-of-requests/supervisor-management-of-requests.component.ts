import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService, NbWindowService, NbWindowState, NbWindowRef } from '@nebular/theme';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { ExchangeRequestsService } from '../../Services/exchange-requests.service';
import { brokerRequest } from '../../Models/CustomersModels/Common/brokerRequest';
import { TimeLineModel } from '../../Models/System/timeLineModel';
import { NotifyManagement } from '../../shared/NotifyManagement';


@Component({
  selector: 'ngx-supervisor-management-of-requests',
  templateUrl: './supervisor-management-of-requests.component.html',
  styleUrls: ['./supervisor-management-of-requests.component.scss']
})
export class SupervisorManagementOfRequestsComponent implements OnInit {
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
  requestServiceSubscriber: Subscription;

  customerType='';

  public selectedRequestItemResult: brokerRequest = null;

  constructor(
    private requests:ExchangeRequestsService,
      private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notify: NotifyManagement,
    private windowService: NbWindowService,
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

      this.requestServiceSubscriber = this.requests.getSupervisorRequests().subscribe(result=>
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
        },error=>{
          this.loadingGrid = false;
        })
    }



  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.requestServiceSubscriber !== undefined) {
      this.requestServiceSubscriber.unsubscribe();
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
  //   if (status === "no") {
  //     this.opened = false;
  //     return;
  //   }
  //   this.requestServiceSubscriber = this.creditService
  //   .deleteCreditById(this.selectedRequestItemResult.requestId)
  //   .subscribe(
  //     data => {
  //       this.showNotifySuccessSend(data);
  //       this.creditService.getAllCreditsBaseCredittype("credit");
  //     },
  //     err => {
  //       this.showErrorDelete(err);
  //     }
  //   );
  // this.opened = false;
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
 

  checkIsSelectedRow(itemId: number) {
    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return true;

    if (this.selectedRequestItemResult.id == itemId){
          return false;
    }
    return true;
  }
  SaveRequestsFake(request):void{
    console.log(request)
    this.sidebarService.toggle('out');
    this.loadingGrid = true;
    this.refreshRequests();
  }

  SetCustomerType(customerType):void{
    this.customerType=customerType;
    console.log(customerType);
  }


  updateRequests(request:any){
    this.gridData.data.push(request);
  }

  sendRequestToServer(){
    // this.checkIsSelectedRow(this.selectedRequestItemResult.id);
    // this.brokerRequests.sendDraftRequestToServer(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
    //   true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
    //       console.log(this.result);
    //       this.refreshRequests();
    // })
  }

  deleteSelectedRequest(){
 
    // this.brokerRequests.deleteDraftRequest(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
    //   true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
    //       this.refreshRequests();
    // }) 
  }

  

    // for (let index = 1; index <= 100; index++) {
    //   await this.delay(6000);
    //   this.value=index;
    //   if(index==100){
    //     this.refreshRequests();
    //     index=1;
    //   }
    // }
  // }
 

  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;
  showDescription() {
    this.windowService.open(
      this.contentTemplate,
      { title: 'توضیحات درخواست', context: { text: this.selectedRequestItemResult.responseDescription } },
    );
  }
  @ViewChild('contentTemplateResponsebrokerRequest', { static: false }) contentTemplateResponsebrokerRequest: TemplateRef<any>;


  statusOfResponseIsReject=true;
  ModalTitleBaseOnOperation='';
  modalVal:any;
  responseRequest(statusOfResponseIsReject:boolean){
    if(this.selectedRequestItemResult==undefined || this.selectedRequestItemResult==null)
    return;

  this.statusOfResponseIsReject=statusOfResponseIsReject;
    if(this.statusOfResponseIsReject)
      this.ModalTitleBaseOnOperation='رد درخواست برای : '
    else
      this.ModalTitleBaseOnOperation='تایید اولیه درخواست برای : '

  this.modalVal=  this.windowService.open(
      this.contentTemplateResponsebrokerRequest,
      { title:  this.ModalTitleBaseOnOperation + this.selectedRequestItemResult.name},
    );
  }

  closeModal() {
    this.modalVal.close();
  }
  sendDataToServer:boolean=false;
  description:string='';
  acceptSelectedRequest(){
    this.sendDataToServer=true;
    this.requests.supervisorAcceptRequestByReqId(this.selectedRequestItemResult.id,this.description).subscribe(x=>{
      console.log(x)
      this.sendDataToServer=false;
      this.refreshAllRequest();
      this.closeModal();
      this.description="";
    },error=>{
      this.sendDataToServer=false;
    })
  }

  rejectSelectedRequest(){
    this.sendDataToServer=true;
    console.log(this.description)
    this.requests.supervisorRejectRequestByReqId(this.selectedRequestItemResult.id,this.description).subscribe(x=>{
      console.log(x);
      this.sendDataToServer=false;
      this.refreshAllRequest();
      this.closeModal();
      this.description="";
    },error=>{
      this.sendDataToServer=false;
    })
  }

  
  @ViewChild('contentHistoryOfRejectDescriptions', { static: false }) contentHistoryOfRejectDescriptions: TemplateRef<any>;
  timeLineCollection:Array<TimeLineModel>;
  showTimeLineHistory(){

    //  let collection=new Array<TimeLineModel>();
    // for (let index = 1; index <= 3; index++) {
    // var  obj=new TimeLineModel();
    //   obj.id=index;
    //   obj.title='پشتیبان لینوکس (هاستینگ) '+ index;
    //   obj.date='1398-12-23'
    //   obj.description='شرکت پارس پک،از شرکت های دانش بنیان و پیشرو در حوزه فناوری اطلاعات جهت تکمیل کادر فنی خود در استان تهران محدوده سعادت آباد از افراد واجد شرایط زیر دعوت به همکاری می نماید. '+ index;
    //   collection.push(obj)
    // }
    // this.timeLineCollection=collection;

    // this.windowService.open(
    //   this.contentHistoryOfRejectDescriptions,
    //   { title: 'تاریخچه دلایل رد ردخواست' },
    // );

    if (this.selectedRequestItemResult==undefined || this.selectedRequestItemResult==null)
      return;
    this.requests.getHistoryOfrejectRequestByRequestId(this.selectedRequestItemResult.id).subscribe(result=>{
      console.log(result.items);
      this.timeLineCollection=result.items;
      if(this.timeLineCollection==undefined ||this.timeLineCollection==null || this.timeLineCollection.length==0)
      {
        this.notify.showErrorMessageBoxWithDuplicate('تاریخچه رد درخواست یافت نشد!')
        return;
      }

      this.windowService.open(
        this.contentHistoryOfRejectDescriptions,
        { title: 'تاریخچه دلایل رد ردخواست' },
      );
    });


  }
  
}
