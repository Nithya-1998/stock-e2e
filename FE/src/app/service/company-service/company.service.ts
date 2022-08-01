import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../Company';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = "http://localhost:8003";
  constructor(private httpClient: HttpClient, private userAuthService: UserService) { }
  token = this.userAuthService.getJwt();
   getAllcompanies(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpClient.post<any>(this.baseUrl + "/stocks/getAllCompanyStocks", {} ,httpOptions);
  }
}
