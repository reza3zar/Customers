import { AddressDetails } from './../../Models/CustomersModels/Individual/addressDetails';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  detailsInformation: AddressDetails=new AddressDetails();
  hasStandardStructure=true;
  @Input() gridDataCollection:Array<AddressDetails>=new Array<AddressDetails>();

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      alley: ['', ],
      street: ['', [Validators.required ]],
      pelak: ['', [Validators.required ]],
      postalCode: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      tel: ['',[Validators.minLength(8), Validators.maxLength(8)]],
      mobile: ['',[Validators.minLength(11), Validators.maxLength(11),Validators.pattern('^(09)[0-9]{9}$')]],
      areaCode: ['',[Validators.minLength(3), Validators.maxLength(4)]],
      description:[''],
      hasStandardStructure:[''],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      addressType: ['', [Validators.required ]],
  });

  }

  get ctrl() { return this.requestForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;

  }

  

  if((this.selectedRequestItemResult.id===undefined))
  {
    this.addressId++;
    this.detailsInformation.id= this.addressId;
    this.gridDataCollection.push(this.detailsInformation)
  }
  else{

    this.showUpdatedItem(this.detailsInformation)
  }

   this.detailsInformation=this.selectedRequestItemResult=new AddressDetails();
   this.showNewRequest=false;
   this.submitted = false;
 

}
 
editSelectedAddress(){
  this.detailsInformation=this.selectedRequestItemResult;
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


addressId=1;
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
selectedRequestItemResult=new AddressDetails();
public selected(e) {
  let selectedCredit = new AddressDetails();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as AddressDetails)
    : new AddressDetails();


}
showNewRequest=false;

createNewRequest(){
  this.selectedRequestItemResult=new AddressDetails();
  this.hasStandardStructure=true;
  this.errorMinRecord="";
  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  this.clickedPrevious.emit();

}
errorMinRecord="";
onNext(){
  if(this.gridDataCollection.length==0)
    {
      this.errorMinRecord="لازم است حداقل یک آدرس درج شود"
      return;
    }
  this.clickedNext.emit();
  this.showNewRequest=false;

}

cancel(){
  this.showNewRequest=false;
  this.detailsInformation=new AddressDetails();
  this.disableShowBtn=true;
}

deleteItem(field:AddressDetails) {
  //refactor & null Check !
  const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedAddress(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.detailsInformation=new AddressDetails();


  this.disableShowBtn=true;
}

hasStandardStructureChanged(hasStructure){
  if(hasStructure==false){
    this.detailsInformation.street='ندارد';
    this.detailsInformation.alley='ندارد';
    this.detailsInformation.pelak='ندارد';
  }else{
    this.detailsInformation.street='';
    this.detailsInformation.alley='';
    this.detailsInformation.pelak='';
  }
}

}
