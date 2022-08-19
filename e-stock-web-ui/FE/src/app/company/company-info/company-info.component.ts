import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/service/Company';
import { CompanyService } from 'src/app/service/company-service/company.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
})
export class CompanyInfoComponent implements OnInit {
  @Input() 'company': Company;
  @Output() removeCompany: EventEmitter<string> = new EventEmitter<string>();
  @Input() 'companyId': string;
  @Output() viewMore: EventEmitter<string> = new EventEmitter<string>();

  currentStockPrice = '';
  displayStyle = 'none';

  'message' = '';

  'name' = localStorage.getItem('emailId');
  removed = false;
  'id': any;
  _id: any;
  'role': any;
  constructor(
    private userAuthService: UserService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('emailId');
  }

  onRemovingCompany(companyCode: string) {
    console.log(companyCode);
    this.companyId = companyCode;
    this.removeCompany.emit(companyCode);
  }

  opneLink(url: any) {
    window.open('//' + url, '_blank');
  }

  onEditCompany(companyCode: any) {
    this.displayStyle = 'block';
    console.log('Inside Edit');
    this.router.navigate(['/company-add',companyCode]);
  }

  saveDetails(company: any) {
    console.log('Save company ' + company);
    this.displayStyle = 'none';
  }

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  sellStocks(companyCode: string) {
    this.message = 'Currently Inactive';
    setTimeout(() => {
      this.message = '';
    }, 1000);
  }
}
