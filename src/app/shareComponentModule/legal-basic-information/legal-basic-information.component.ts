import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import * as moment from "jalali-moment";
import { LegalBasicInformation } from '../../Models/CustomersModels/Legal/legalBasicInformation';

@Component({
  selector: 'app-legal-basic-information',
  templateUrl: './legal-basic-information.component.html',
  styleUrls: ['./legal-basic-information.component.css']
})
export class LegalBasicInformationComponent implements OnInit,OnDestroy {
  dateObject: moment.Moment;
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() legalBasicInformation: LegalBasicInformation = new LegalBasicInformation();

  ngOnDestroy(): void {
  }

  ngOnInit() {

    if (this.legalBasicInformation.persianRegisterDate === undefined)
    this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
    else
  this.dateObject = moment(
    this.legalBasicInformation.persianRegisterDate,
    "jYYYY,jMM,jDD"
  );



    this.requestForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      activityType: ["", Validators.required],
      legalType: ["", Validators.required],
      registerNumber: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(20)]],
      registerCity: ["", Validators.required],
      economicCode: ["", [Validators.required,Validators.minLength(12), Validators.maxLength(12)]],
      nationality: ["", Validators.required],
      dateObject: ["", Validators.required],
      isLocatedInFreeZones: ["" ],
      isLocatedInSpecialEconomicZones: ["" ],
      freeZone: ["" ],
      specialEconomicZones: ["" ],
      nationalCode: ["", [Validators.required]]
    });


  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();
  errorMsg="";
  errorMsgLocatedInFreeZones="";
  errorMsgLocatedInSpecialEconomicZones="";


  onSubmit() {

  if(this.legalBasicInformation.isLocatedInFreeZones && this.legalBasicInformation.isLocatedInSpecialEconomicZones)
    {
      this.errorMsg="لازم است حداقل یک گزینه منطقه آزاد یا ویژه تجاری انتخاب شود"
      return;
    }

    if(this.legalBasicInformation.isLocatedInFreeZones && (this.legalBasicInformation.freeZone==null || this.legalBasicInformation.freeZone==undefined))
    {
      this.errorMsgLocatedInFreeZones="لازم است شهر منطقه آزاد تجاری و صنعتی انتخاب شود"
      return;
    }

    if(this.legalBasicInformation.isLocatedInSpecialEconomicZones && (this.legalBasicInformation.specialEconomicZones==null || this.legalBasicInformation.specialEconomicZones==undefined) )
    {
      this.errorMsgLocatedInSpecialEconomicZones="لازم است شهر منطقه ویژه اقتصادی انتخاب شود"
      return;
    }

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    this.clickedNext.emit();
    try {
   

      this.legalBasicInformation.registerDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
      this.legalBasicInformation.persianRegisterDate = this.dateObject.format(
        "jYYYY/jMM/jD"
      );

    } catch (error ) {

    }

  }

  onPrevious() {
    this.clickedPrevious.emit();
    try {

      this.legalBasicInformation.registerDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
      this.legalBasicInformation.persianRegisterDate = this.dateObject.format(
        "jYYYY/jMM/jD"
      );

    } catch (error) {

    }


  }
}
