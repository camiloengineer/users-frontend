import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../shared/models/authenticate.model';
import { IUser } from '../../shared/models/user.model';
import { SessionService } from './session.service';
import { IGetCustomersResponse } from 'src/app/shared/models/getCustomers.model';
import { IGetCustomerResponse } from 'src/app/shared/models/getCustomer.model';
import { ICreateOrUpdateCustomerResponse } from 'src/app/shared/models/createOrUpdateCustomer.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient,
    private sessionService: SessionService,
    ) { }
  
  public postAuthenticate(authenticateRequest: IAuthenticateRequest): Observable<IAuthenticateResponse>{
    
    let response = this._http.post<IAuthenticateResponse>(`${environment.apiURL}authenticate`, authenticateRequest);
    return response;
  }

  public postUpdateCustomer(user: IUser): Observable<ICreateOrUpdateCustomerResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ this.sessionService.token }`
    })
    let response = this._http.put<ICreateOrUpdateCustomerResponse>(`${environment.apiURL}updatecustomer`, user, { headers: headers });
    return response;
  }

  public postCreateCustomer(user: IUser): Observable<ICreateOrUpdateCustomerResponse>{
    let response = this._http.post<ICreateOrUpdateCustomerResponse>(`${environment.apiURL}createcustomer`, user);
    return response;
  }

  public getCustomer(dni: number): Observable<IGetCustomerResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ this.sessionService.token }`
    })
    let response = this._http.get<IGetCustomerResponse>(`${environment.apiURL}getcustomer?dni=${ dni }`, { headers: headers });
    return response;
  }

  public getCustomers(): Observable<IGetCustomersResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ this.sessionService.token }`
    })
    let response = this._http.get<IGetCustomersResponse>(`${environment.apiURL}getcustomers`, { headers: headers });
    return response;
  }

  public deleteCustomers(dni: number): Observable<void>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ this.sessionService.token }`
    })
    let response = this._http.delete<void>(`${environment.apiURL}deletecustomer?dni=${ dni }`, { headers: headers });
    return response;
  }
}
