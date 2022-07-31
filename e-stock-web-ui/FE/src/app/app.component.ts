import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({

         transform: 'translate3D(0g,0,0)'

        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)'
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ]

})
export class AppComponent {
  title = "stock-market-ui";
  name = 'Angular';
  "open": boolean;

  menuState: string = 'out';

  toggleMenuOpen() {
    if(this.menuState == "out") {
      this.open = true;
    } else {
      this.open = false;
    }
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

 }
