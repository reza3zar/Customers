import { InteriorIndividualRequest } from './../Models/CustomersModels/Request/InteriorIndividualRequest/interiorIndividualRequest';
import { InteriorLegalBrokerRequest } from './../Models/CustomersModels/Common/interiorLegalBrokerRequest';
import { brokerRequest } from './../Models/CustomersModels/Common/brokerRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AppUrl } from '../app-url';
import { InteriorIndividualBrokerRequest } from '../Models/CustomersModels/Common/interiorIndividualBrokerRequest';

@Injectable({
  providedIn: 'root'
})
export class BrokerRequestsService {

  private url = AppUrl;
  constructor(private http: HttpClient) { }


  public getBrokerRequests(): Observable< any>{
   return this.http.get<any>(this.url.brokerRequests);
  }

  public chekIsExistExternalId(externalId):Observable<any>{
    return this.http.get(this.url.chekIsExistExternalId+'/'+externalId);
  }

  public saveLegalInteriorNewRequest(interiorLegalReq:InteriorLegalBrokerRequest):Observable<any>{
    return this.http.post(this.url.saveLegalInteriorNewRequest,interiorLegalReq);
  }

  public saveDraftIndividualInteriorNewRequest(interiorIndividualRequest:InteriorIndividualBrokerRequest):Observable<any>{
    return this.http.post(this.url.saveIndividualInteriorNewRequest,interiorIndividualRequest);
  }
  public sendDraftRequestToServer(requestId:number,requestTypeId:number,requestIsInterior:boolean,customerType:number):Observable<any>{
    if(requestTypeId==1/*Add */&& requestIsInterior/*irainianCustomer*/&& customerType==1/*Individual*/)
         return  this.http.post(this.url.sendAddDraftIndividualInteriorToServer+requestId,'');

    if(requestTypeId==1/*Add */&& requestIsInterior/*irainianCustomer*/&& customerType==3/*Individual*/)
         return  this.http.post(this.url.sendAddDraftLegalInteriorToServer+requestId,''); 
  }


  public deleteDraftRequest(requestId:number,requestTypeId:number,requestIsInterior:boolean,customerType:number):Observable<any>{
    if(requestTypeId==1/*Add */&& requestIsInterior/*irainianCustomer*/&& customerType==1/*Individual*/)
         return  this.http.delete(this.url.sendAddDraftIndividualInteriorToServer+requestId);

    if(requestTypeId==1/*Add */&& requestIsInterior/*irainianCustomer*/&& customerType==3/*Individual*/)
         return  this.http.delete(this.url.sendAddDraftLegalInteriorToServer+requestId); 
  }

  public getAllCustomersOfBroker(pageSize):Observable<any>{
    return this.http.get<any>(this.url.allCustomersOfBroker+'?PageSize='+pageSize);
  }

  public getKeyOfIndividualInteriorForExportPdf(requestId):Observable<any>{
    return this.http.get<any>(this.url.keyOfIndividualInteriorForExportPdf+requestId);
  }
 
  public getPdfOfRequestByKey(keyCode):Observable<any>{
    console.log(keyCode)
    return this.http.post(this.url.getPdfOfRequestByKey,keyCode);
  }

}
