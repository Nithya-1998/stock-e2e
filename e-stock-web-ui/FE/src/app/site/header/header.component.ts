import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() 'isLoginValid': boolean;
  @Output() 'username': EventEmitter<any> = new EventEmitter<any>();
  status = false;
  name = "Please";
  menuState = "in";
  constructor( private userAuthService: UserService,
    private el:ElementRef, private renderer:Renderer2,
    private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn") == "yes" || this.userAuthService.getLoggedIn()) {
      this.status = true;
    }
  }
  setUserName(username : any){
    this.isLoginValid = username;
    this.status = true;
  }

  onLogOut() {
    this.status = false;
    localStorage.setItem("loggedIn", "no");
    localStorage.removeItem("name");
    localStorage.clear();
    this.userAuthService.loggedIn=false;
    this.userAuthService.logout();
    this.router.navigate(['/login']);
  }

}
