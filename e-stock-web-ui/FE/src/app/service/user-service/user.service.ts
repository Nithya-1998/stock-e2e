import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCred } from '../UserCred';
import { UserToken } from '../UserToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:8001";
  userToken : any;
  loggedIn = false;
  constructor(private httpClient: HttpClient) {}
  authenticate(userCred: UserCred): Observable<any> {
    localStorage.setItem("emailId", userCred.emailId);
    return this.httpClient.post<any>(this.baseUrl+"/users/getUser", userCred);
  }
  public setUserToken(userToken: UserToken){
    this.userToken = userToken
  }

  public getUserToken(){
    return this.userToken;
  }

  public logout() {
    this.userToken = null;
  }

  public setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn
  }

  public getLoggedIn(){
    return this.loggedIn;
  }
}
