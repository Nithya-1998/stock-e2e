import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @HostListener('window:localStorage')
  @Input() 'username': any = localStorage.getItem("name");
  status = false;
  'name': string = "Please";
  menuState = "in";
  constructor( private userAuthService: UserService,
    private el:ElementRef, private renderer:Renderer2,
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn") == "yes" || this.userAuthService.getLoggedIn()) {
      console.log( this.userAuthService.getLoggedIn());
      this.status = true;
    } else {
      this.status = false;
    }
  }

  onLogOut() {
    this.status = false;
    localStorage.setItem("loggedIn", "no");
    localStorage.removeItem("name");
    this.userAuthService.loggedIn=false;
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }


}
