import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppUrl } from './Url';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRequestsService {

  private url = AppUrl;
  constructor(private http: HttpClient) { }

  getRequestsOfBrokers(): Observable< any>{
    return this.http.get<any>(this.url.requestsOfBrokers);
   }

   acceptRequestByReqId(reqId:number,description): Observable< any>{
    return this.http.post<any>(this.url.acceptRequest+reqId,{Description:description});
   }

   rejectRequestByReqId(reqId:number,description): Observable< any>{
    return this.http.post<any>(this.url.rejectRequest+reqId,{Description:description});
   }

   getSupervisorRequests(): Observable< any>{
    return this.http.get<any>(this.url.supervisorRequests);
   }

   supervisorAcceptRequestByReqId(reqId:number,description): Observable< any>{
    return this.http.put<any>(this.url.supervisorAcceptRequest+reqId,{Description:description});
   }

   getHistoryOfrejectRequestByRequestId(requestId ){
 
    // return this.http.get<any>(this.url.historyOfrejectRequest, {  params: new HttpParams({fromString: "Id=4"})});
    // let params = new HttpParams()
    // .set("requestData", encodeURIComponent(JSON.stringify(dataPrincipalBlnc)))
    // .set("authenticationType", this.authType);

    // let params = new HttpParams()
    // .set("Id",  requestId);
    return this.http.get<any>(this.url.historyOfrejectRequest+requestId);
   }

   supervisorRejectRequestByReqId(reqId:number,description): Observable< any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        Description: description,
      }
    }
    return this.http.delete<any>(this.url.supervisorRejectRequest+reqId,options);
   }
}
