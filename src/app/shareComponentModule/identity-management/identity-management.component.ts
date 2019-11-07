import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IdentityDetails } from "../../Models/CustomersModels/Individual/identityDetails";

@Component({
  selector: "app-identity-management",
  templateUrl: "./identity-management.component.html",
  styleUrls: ["./identity-management.component.css"]
})
export class IdentityManagementComponent implements OnInit {
  @Input() gridDataCollection: Array<IdentityDetails> = new Array<
    IdentityDetails
  >();

  identityDetail: IdentityDetails = new IdentityDetails();
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      code: ["", [Validators.required,Validators.minLength(3), Validators.maxLength(20)]],
      identityType: ["", Validators.required]
    });
  }
  identityId = 1;

  get ctrl() {
    return this.requestForm.controls;
  }

  selectedRequestItemResult = new IdentityDetails();
  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    if (this.selectedRequestItemResult.id === undefined) {
      this.identityId++;
      this.identityDetail.id = this.identityId;
      this.gridDataCollection.push(this.identityDetail);
    } else {
      this.showUpdatedItem(this.identityDetail);
    }

    this.identityDetail = this.selectedRequestItemResult;// = new IdentityDetails();
    this.showNewRequest=false;
    this.submitted = false;
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  showUpdatedItem(newItem) {
    let updateItem = this.gridDataCollection.find(
      this.findIndexToUpdate,
      newItem.id
    );

    let index = this.gridDataCollection.indexOf(updateItem);

    this.gridDataCollection[index] = newItem;
  }

  disableShowBtn = true;
  public selected(e) {
    let selectedCredit = new IdentityDetails();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as IdentityDetails)
      : new IdentityDetails();

  }

  showNewRequest = false;

  createNewRequest() {
    this.selectedRequestItemResult= new IdentityDetails(); 
    this.showNewRequest = true;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  onPrevious() {
    this.clickedPrevious.emit();
  }

  onNext() {
    this.clickedNext.emit();
    this.showNewRequest = false;
  }

  cancel() {
    this.showNewRequest = false;
    this.identityDetail = new IdentityDetails();
    this.disableShowBtn = true;
  }

  deleteItem(field: IdentityDetails) {
    //refactor & null Check !
    const arr: any = this.gridDataCollection.find(x => x.id == field.id);
    const indexItem: number = this.gridDataCollection.indexOf(arr);

    if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
    }
  }

  deleteSelectedIdentify() {
    this.deleteItem(this.selectedRequestItemResult);
    this.selectedRequestItemResult = this.identityDetail = new IdentityDetails();
    this.disableShowBtn = true;
  }

  editSelectedIdentify() {
    this.identityDetail = this.selectedRequestItemResult;
    console.log(this.identityDetail)
    this.showNewRequest = true;
  }
}
