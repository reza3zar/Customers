import { PersonalDetails } from "./../../Models/CustomersModels/Individual/personalDetails";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import * as moment from "jalali-moment";
@Component({
  selector: "app-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.css"]
})
export class PersonalDetailsComponent implements OnInit,OnDestroy {
  dateObject: moment.Moment;
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() personalDetailsInformation: PersonalDetails = new PersonalDetails();

  ngOnDestroy(): void {
  }

  ngOnInit() {
    if (this.personalDetailsInformation.persianBirthBirthDate === undefined)
      this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
      else
    this.dateObject = moment(
      this.personalDetailsInformation.persianBirthBirthDate,
      "jYYYY,jMM,jDD"
    );



    this.requestForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      dateObject: ["", [Validators.required]],
      fatherName: ["", [Validators.required]],
      identificationNumber: ["", [Validators.required]],
      registerCity: [""],
      nationality: [""],
      letterSeries:  ["", [Validators.required]],
      digitalSeries: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(2)]],
      serialIdentification: ["", [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      nationalCode: ["", [Validators.required]]
    });
  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    this.clickedNext.emit();

    this.personalDetailsInformation.birthDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
    this.personalDetailsInformation.persianBirthBirthDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );
  }

  onPrevious() {
    this.clickedPrevious.emit();

    this.personalDetailsInformation.birthDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
    this.personalDetailsInformation.persianBirthBirthDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );
  }
  onKey(event: any) { 
    var p=/^[\u0600-\u06FF\s]+$/;
    if(event.key.match(p)==null){
         event.preventDefault();
        return false;
    }
    return true;
  }

}
