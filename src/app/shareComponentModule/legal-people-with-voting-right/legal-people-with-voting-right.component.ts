import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalPeopleWithVotingRight } from '../../Models/CustomersModels/Common/legalPeopleWithVoting';
import * as moment from "jalali-moment";

@Component({
  selector: 'app-legal-people-with-voting-right',
  templateUrl: './legal-people-with-voting-right.component.html',
  styleUrls: ['./legal-people-with-voting-right.component.css']
})
export class LegalPeopleWithVotingRightComponent implements OnInit {
  dateObject: moment.Moment;
  dateObjectExpire: moment.Moment;

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  legalPeopleWithVotingRight: LegalPeopleWithVotingRight=new LegalPeopleWithVotingRight();
  @Input() gridDataCollection:Array<LegalPeopleWithVotingRight>=new Array<LegalPeopleWithVotingRight>();

  ngOnInit() {
    if (this.legalPeopleWithVotingRight.persianAssignmentDate === undefined)
    this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
    else
  this.dateObject = moment(
    this.legalPeopleWithVotingRight.persianAssignmentDate,
    "jYYYY,jMM,jDD"
  );

  if (this.legalPeopleWithVotingRight.persianAssignmentExpirationDate === undefined)
  this.dateObjectExpire = moment("1360-11-22", "jYYYY,jMM,jDD");
  else
this.dateObjectExpire = moment(
  this.legalPeopleWithVotingRight.persianAssignmentExpirationDate,
  "jYYYY,jMM,jDD"
);


  
    this.requestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      assignmentDate: ['', Validators.required],
      assignmentExpirationDate: ['', Validators.required],
      nationalCode: ['',   [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      phone: ['', [Validators.minLength(11), Validators.maxLength(11),Validators.pattern('^(09)[0-9]{9}$')]],
      address: ['', [Validators.required ]],
      postalCode: ['',  [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      directorateAuthorities: ['', [Validators.required ]],
  });

  }

  get ctrl() { return this.requestForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;

  }
  this.setDateToObject();

  if((this.selectedRequestItemResult.id===undefined))
  {
    this.id++;
    this.legalPeopleWithVotingRight.id= this.id;
    this.gridDataCollection.push(this.legalPeopleWithVotingRight)
  }
  else{

    this.showUpdatedItem(this.legalPeopleWithVotingRight)
  }

   this.legalPeopleWithVotingRight=this.selectedRequestItemResult=new LegalPeopleWithVotingRight();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}


editSelectedItem(){
  this.legalPeopleWithVotingRight=this.selectedRequestItemResult;
  this.showNewRequest=true;
}

showUpdatedItem(newItem){
  let updateItem = this.gridDataCollection.find(this.findIndexToUpdate, newItem.id);

  let index = this.gridDataCollection.indexOf(updateItem);


  this.gridDataCollection[index] = newItem;

}

findIndexToUpdate(newItem) {
      return newItem.id === this;
}


id=1;
public removeValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).clearValidators();
       form.get(key).updateValueAndValidity();
  }
}

public addValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).setValidators(this.requestForm[key]);
       form.get(key).updateValueAndValidity();
  }
}

disableShowBtn = true;
selectedRequestItemResult=new LegalPeopleWithVotingRight();
public selected(e) {
  let selectedCredit = new LegalPeopleWithVotingRight();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as LegalPeopleWithVotingRight)
    : new LegalPeopleWithVotingRight();


}
showNewRequest=false;

createNewRequest(){
  this.selectedRequestItemResult=new LegalPeopleWithVotingRight();
  this.errorMinRecord="";
  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  this.setDateToObject();
  this.clickedPrevious.emit();

}
errorMinRecord="";
onNext(){
  if(this.gridDataCollection.length==0)
  {
    this.errorMinRecord="لازم است حداقل مشخصات مشخصات هیات عامل، حسابرس، بازرسان قانونی یا هیات امنا درج شود"
    return;
  }
  this.setDateToObject();
  this.clickedNext.emit();
  this.showNewRequest=false;

}

cancel(){
  this.showNewRequest=false;
  this.legalPeopleWithVotingRight=new LegalPeopleWithVotingRight();
  this.disableShowBtn=true;
}

deleteItem(field:LegalPeopleWithVotingRight) {
  //refactor & null Check !
  const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.legalPeopleWithVotingRight=new LegalPeopleWithVotingRight();


  this.disableShowBtn=true;
}

setDateToObject():void{
  
  this.legalPeopleWithVotingRight.assignmentDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
  this.legalPeopleWithVotingRight.persianAssignmentDate = this.dateObject.format(
    "jYYYY/jMM/jD"
  );

  this.legalPeopleWithVotingRight.assignmentExpirationDate=  moment.from( this.dateObjectExpire.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
  this.legalPeopleWithVotingRight.persianAssignmentExpirationDate = this.dateObjectExpire.format(
    "jYYYY/jMM/jD"
  );
}

}
