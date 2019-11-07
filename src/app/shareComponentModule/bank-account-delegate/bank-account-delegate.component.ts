import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankAccountDelegate } from '../../Models/CustomersModels/Common/bankAccountDelegate';
import * as moment from "jalali-moment";

@Component({
  selector: 'app-bank-account-delegate',
  templateUrl: './bank-account-delegate.component.html',
  styleUrls: ['./bank-account-delegate.component.css']
})
export class BankAccountDelegateComponent implements OnInit {

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  bankItem: BankAccountDelegate=new BankAccountDelegate();
  @Input() gridDataCollection:Array<BankAccountDelegate>=new Array<BankAccountDelegate>();
  dateObject: moment.Moment;

  ngOnInit() {

 

    if (this.bankItem.persianBirthDate === undefined)
    this.dateObject = moment("1360-11-22", "jYYYY,jMM,jDD");
    else
  this.dateObject = moment(
    this.bankItem.persianBirthDate,
    "jYYYY,jMM,jDD"
  );


    this.requestForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      fatherName: ['', [Validators.required ]],
      birthDate: [''],
      nationalCode: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      postalCode: ['',  [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      address: ['', [Validators.required ]],

  });

  }

  get ctrl() { return this.requestForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;

  }

  if((this.selectedRequestItemResult.bankId===undefined))
  {
    this.bankId++;
    this.bankItem.bankId= this.bankId;
    this.bankItem.birthDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
    this.bankItem.persianBirthDate = this.dateObject.format(
      "jYYYY/jMM/jD"
    );
    this.gridDataCollection.push(this.bankItem);
  }
  else{

    this.showUpdatedItem(this.bankItem)
  }

   this.bankItem=this.selectedRequestItemResult=new BankAccountDelegate();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}


editSelectedbankItem(){
  this.bankItem=this.selectedRequestItemResult;
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


bankId=1;
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
selectedRequestItemResult=new BankAccountDelegate();
public selected(e) {
  let selectedCredit = new BankAccountDelegate();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as BankAccountDelegate)
    : new BankAccountDelegate();


}
showNewRequest=false;

createNewRequest(){
  this.selectedRequestItemResult=new BankAccountDelegate();
  this.errorMinRecord="";
  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  this.clickedPrevious.emit();
 
  this.bankItem.birthDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
  this.bankItem.persianBirthDate = this.dateObject.format(
    "jYYYY/jMM/jD"
  );
  
}
errorMinRecord="";
onNext(){

  if(this.gridDataCollection.length==0)
  {
    this.errorMinRecord="لازم است حداقل مشخصات یک دارندگان حق برداشت درج شود"
    return;
  }

  this.clickedNext.emit();
  this.showNewRequest=false;

  this.bankItem.birthDate=  moment.from( this.dateObject.format("jYYYY/jMM/jD"), 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');   
  this.bankItem.persianBirthDate = this.dateObject.format(
    "jYYYY/jMM/jD"
  );
}

cancel(){
  this.showNewRequest=false;
  this.bankItem=new BankAccountDelegate();
  this.disableShowBtn=true;
}

deleteItem(field:BankAccountDelegate) {

  const arr: any = this.gridDataCollection.find(x=>x.bankId==field.bankId)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedbankItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.bankItem=new BankAccountDelegate();


  this.disableShowBtn=true;
}

}
