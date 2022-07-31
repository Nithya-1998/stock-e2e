import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent{

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('sidenav') "sidenav": MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = "hkhkh";
    this.sidenav.close();
  }

}
