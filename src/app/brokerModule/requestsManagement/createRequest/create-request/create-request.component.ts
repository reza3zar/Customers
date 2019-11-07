
import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BrokerRequestsService } from "../../../../services/broker-requests.service";
import { Subscription } from "rxjs";
import { NotificationService } from "@progress/kendo-angular-notification";
import { InteriorIndividualBrokerRequest } from "../../../../Models/CustomersModels/Common/interiorIndividualBrokerRequest";
import { BrokerRequestParameter } from "../../../../Models/Misc/BrokerRequestParameter";
import { InteriorLegalBrokerRequest } from "../../../../Models/CustomersModels/Common/interiorLegalBrokerRequest";
import { SidebarService } from "../../../../SlideInOutModule/sidebar.service";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NotifyManagement } from '../../../../shared/NotifyManagement';
 
@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"]
})


export class CreateRequestComponent implements OnInit, OnDestroy {
  errorDescription:string='';
  // request: brokerRequest = new brokerRequest();
  requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();
  requestInteriorLegal: InteriorLegalBrokerRequest = new InteriorLegalBrokerRequest();

  @Output() clickedSaveRequest = new EventEmitter<any>();
  @Output() clickedCustomerType = new EventEmitter<any>();

  customerTypeDescription = "";
  requestForm: FormGroup;
  isNationalCodeIsvalid=false;
  sendDataToServer=false;
  initialParameter: BrokerRequestParameter = new BrokerRequestParameter();
  @ViewChild('myModal', {static: false}) myModal;
  @Output() saveRequestOccurred: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotifyManagement,
    private service: BrokerRequestsService,
    private sidebarService: SidebarService,
    private serviceServer:SidebarService
  ) {}
  submitted = false;
  nationalCodeLength=10;
  maskTxt='0000000000';


  ngOnInit() {

    this.sendDataToServer=false;

    this.requestInteriorIndividual = new InteriorIndividualBrokerRequest();

    this.setRequestForm();

  
  }

    setRequestForm(){
      this.requestForm = this.formBuilder.group({
        customerType: ["", Validators.required],
        customerCode: ["", [Validators.required]]
      });
    }

 

  
  get ctrl() {
    return this.requestForm.controls;
  }
  public pageIndex = 0;

customerTypeChangedValue(event){
if(event.id==1){
  this.nationalCodeLength=10;
  this.maskTxt='0000000000';

}
else if(event.id==3)
{
  this.nationalCodeLength=11;
  this.maskTxt='00000000000';

}

}


  onNextPage() {
    this.errorDescription='';
    this.sendDataToServer=true;
    if (this.pageIndex == 0) {
      this.localSubscriber = this.service
        .chekIsExistExternalId(this.initialParameter.nationalCode)
        .subscribe(result => {
          console.log(result)
          this.sendDataToServer=false;
          this.allowNextPage();
      
        },error=>{
          this.sendDataToServer=false;
          this.allowNextPage();
          for (let errItemValue of Object.entries(error.error.errors)) {
            let val=errItemValue[1];
            if(errItemValue[1]!=undefined && errItemValue[1]!=null)
            {
              for (let errorMessageItem of Object.entries(val)){
                this.errorDescription=errorMessageItem[1];
              }
            }
        }
        });
    }
    else
    this.allowNextPage();

  }

allowNextPage(){
  this.submitted = true;
  if (this.requestForm.invalid) {
    return;
  }

  switch (this.initialParameter.customerType.id) {
    case 1:
      this.customerTypeDescription = "InteriorIndividual";
      this.requestInteriorIndividual.personalDetails.nationalCode = this.initialParameter.nationalCode;
      this.clickedCustomerType.emit('InteriorIndividual');
      break;
    case 2:
      this.customerTypeDescription = "ExteriorIndividual";
      this.clickedCustomerType.emit('ExteriorIndividual');

      break;
    case 3:
      this.customerTypeDescription = "InteriorLegal";
      this.requestInteriorLegal.legalbasicInformation.nationalCode = this.initialParameter.nationalCode;
      this.clickedCustomerType.emit('InteriorLegal');

      break;
    case 4:
      this.customerTypeDescription = "ExteriorLegal";
      this.clickedCustomerType.emit('ExteriorLegal');

      break;
    default:
      break;
  }
  this.pageIndex++;
}
  public onPerviousPage() {
    this.sendDataToServer=false;
    if (this.pageIndex == 0){
      this.sidebarService.toggle('out');
      return;
    }
    this.pageIndex--;
  }

  localSubscriber: Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    this.submitted;
  }

  // public showError(err?: any): void {
  //   //   type: 'slide', duration: 400
  //   this.notificationService.show({
  //     content: err,
  //     animation: { type: "fade", duration: 4000 },
  //     position: { horizontal: "center", vertical: "bottom" },
  //     type: { style: "error", icon: true },
  //     closable: true
  //   });
  // }

  saveRequest( ): void {
    if (this.customerTypeDescription == "InteriorIndividual")
    {
      this.requestInteriorIndividual.nationality=this.requestInteriorIndividual.personalDetails.nationality;
      this.requestInteriorIndividual.externalId=this.requestInteriorIndividual.personalDetails.nationalCode;
      this.requestInteriorIndividual.nationalCode=this.requestInteriorIndividual.personalDetails.nationalCode;
      this.requestInteriorIndividual.name=this.requestInteriorIndividual.personalDetails.firstName+' '+this.requestInteriorIndividual.personalDetails.lastName;
      console.log(this.requestInteriorIndividual);
      // console.log(JSON.stringify(this.requestInteriorIndividual) )
      // this.clickedSaveRequest.emit(this.requestInteriorIndividual);

      this.service.saveDraftIndividualInteriorNewRequest(this.requestInteriorIndividual).subscribe(result => {
        console.log(result);
        this.saveRequestOccurred.emit(result);
        this.sidebarService.toggle("out");
        this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")
      },error=>{
        this.serviceServer.sendToServer(false);
        for (let errItemValue of Object.entries(error.error.errors)) {
          let val=errItemValue[1];
          if(errItemValue[1]!=undefined && errItemValue[1]!=null)
          {
            for (let errorMessageItem of Object.entries(val)){
              this.notify.showErrorMessageBox(errorMessageItem[1])
            }
          }
      }}); 
    }

      if (this.customerTypeDescription == "InteriorLegal")
      {

        this.requestInteriorLegal.nationality=this.requestInteriorLegal.legalbasicInformation.nationality;
        this.requestInteriorLegal.externalId=this.requestInteriorLegal.legalbasicInformation.nationalCode;
        this.requestInteriorLegal.nationalId=this.requestInteriorLegal.legalbasicInformation.nationalCode;
        this.requestInteriorLegal.name=this.requestInteriorLegal.legalbasicInformation.companyName;

        console.log(this.requestInteriorLegal);
      

        this.service.saveLegalInteriorNewRequest(this.requestInteriorLegal).subscribe(result => {
          console.log(result);
          this.saveRequestOccurred.emit(result);
          this.sidebarService.toggle("out");
          this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")

        },error=>{
        this.serviceServer.sendToServer(false);
          for (let errItemValue of Object.entries(error.error.errors)) {
            let val=errItemValue[1];
            if(errItemValue[1]!=undefined && errItemValue[1]!=null)
            {
              for (let errorMessageItem of Object.entries(val)){
                this.notify.showErrorMessageBox(errorMessageItem[1])
              }
            }
        }
      });
      }

      
    

  }
    getSpecialProperty<TModel, TKey extends keyof TModel>(
    model: TModel,
    key: TKey
  ) {
    return model[key];
  }
  index = 1;

 



}
