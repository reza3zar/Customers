import { LegalFinancialDetail } from '../../Models/CustomersModels/Common/legalFinancialDetail';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PersonalDetails } from '../../Models/CustomersModels/Individual/personalDetails';
import * as moment from "jalali-moment";

@Component({
  selector: 'app-legal-financial-details',
  templateUrl: './legal-financial-details.component.html',
  styleUrls: ['./legal-financial-details.component.css']
})
export class LegalFinancialDetailsComponent implements OnInit,OnDestroy {
  dateObject: moment.Moment;
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() financialDetail:LegalFinancialDetail=new LegalFinancialDetail()

  ngOnDestroy(): void {
  }

  ngOnInit() {
 
    
    if (this.financialDetail.persianRatingDate === undefined)
    this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
    else
  this.dateObject = moment(
    this.financialDetail.persianRatingDate,
    "jYYYY,jMM,jDD"
  );



    this.requestForm = this.formBuilder.group({
      totalAssetsBasedOnTheLatestFinancialStatements: ["", Validators.required],
      recordingCapitalBasedOnTheLatestOfficialNewspaper: ["", Validators.required],
      totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements: ["", Validators.required],
      totalBuysLastYearBasedOnTheLatestFinancialStatements: ["", Validators.required],
      netSalesAndGrossContractRevenueBasedOnTheLatestFinancialStatements: ["", Validators.required],
      isTheCustomerRankedByReference: [""],
      ratingReferenceName: ["", Validators.required],
      dateObject: [""],
      ratingNumber: ["", Validators.required],
      auctionMarket: [""],
      futureMarket: [""],
      auctionMarketValue: ["", Validators.required],
      futureMarketValue: ["", Validators.required],
    });
  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();
  errortotalAssetsBasedOnTheLatestFinancialStatements="";
  errorrecordingCapitalBasedOnTheLatestOfficialNewspaper="";
  errortotalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements="";
  onSubmit() {

    
    if(this.financialDetail.totalAssetsBasedOnTheLatestFinancialStatements==0)
    {
      this.errortotalAssetsBasedOnTheLatestFinancialStatements="مقدار جــمـــع دارایــی شـــرکـت بــر اســاس آخــرین صــورت هــای مـالی نمی تواند صفر درج شود";
      return;
    }

    if(this.financialDetail.recordedCapitalBasedOnTheLatestOfficialNewspaper==0)
    {
      this.errorrecordingCapitalBasedOnTheLatestOfficialNewspaper="مقدار ســــرمـــایـــه ثــبــی بـــر اســـاس آخـــریــن روزنـــامــــه رســـمــی نمی تواند صفر درج شود";
      return;
    }

    if(this.financialDetail.totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements==0)
    {
      this.errortotalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements="مقدار حقوق صاحبـان سـهـام بـر اســاس آخـریــن صورت هـای مـالـی نمی تواند صفر درج شود";
      return;
    }

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    this.clickedNext.emit();

    this.financialDetail.ratingDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
    this.financialDetail.persianRatingDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );
    

  }

  onPrevious() {
    this.clickedPrevious.emit();

    this.financialDetail.ratingDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
    this.financialDetail.persianRatingDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );


  }
}
