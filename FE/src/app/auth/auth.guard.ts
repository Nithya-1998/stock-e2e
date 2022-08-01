import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { UserService } from '../service/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userAuthService.redirectUrl = state.url;
      console.log('URL', state.url);
      return Observable.create((observer: Observer<boolean>) => {
        if (this.userAuthService.loggedIn) {
          console.log('Logged in');
          observer.next(true);
        }
        else {
          console.log('Not Logged In');
          this.router.navigate(['login'], { queryParams: { from: state.url.substr(1) } });
        }
      })
  }

}
