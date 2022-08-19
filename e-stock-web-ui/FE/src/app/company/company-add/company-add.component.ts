import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from 'src/app/service/Company';
import { CompanyService } from 'src/app/service/company-service/company.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css'],
})
export class CompanyAddComponent implements OnInit {
  'editForm': FormGroup;
  'companyName': string;
  'companyCode': string;
  'currentStockPrice': string;
  'stockPriceHigh': string;
  'stockPriceLow': string;
  'companyCEO': string;
  'volume': string;
  'marketcap': string;
  'companyWebSite': string;
  'stockExchange': string;
  'isAddForm' = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      _id: [],
      companyName: ['', [Validators.required]],
      companyCode: ['', [Validators.required]],
      currentStockPrice: [, [Validators.required]],
      stockPriceHigh: [, [Validators.required]],
      stockPriceLow: [, [Validators.required]],
      companyCEO: ['', Validators.required],
      volume: [, Validators.required],
      marketcap: ['', Validators.required],
      companyWebSite: ['', Validators.required],
      stockExchange: [, Validators.required],
      emailId: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
          Validators.email,
        ],
      ],
    });

    this.route.params.subscribe((params: Params) => {
      const companyCode = params['id'];
      console.log(companyCode);
      this.companyService.getCompany(companyCode).subscribe((response: any) => {
        console.log(response.data);
        let company = response.data;
        if (
          companyCode == null ||
          companyCode == undefined ||
          company === null
        ) {
          this.isAddForm = true;
        }
        if (company) {
          this.editForm.patchValue({
            _id: company._id,
            companyName: company.companyName,
            companyCode: company.companyCode,
            currentStockPrice: company.currentStockPrice,
            stockExchange: company.stockExchange,
            stockPriceHigh: company.stockPriceHigh,
            stockPriceLow: company.stockPriceLow,
            volume: company.volume,
            marketcap: company.marketcap,
            companyCEO: company.companyCEO,
            companyWebSite: company.companyWebSite,
            emailId: company.emailId,
            logo: company.logo,
          });
        }
      });
    });
  }
  onSubmit(editForm: any) {
    if(parseFloat(this.editForm.value.stockPriceLow) >  parseFloat(this.editForm.value.currentStockPrice)) {
      this.editForm.value.stockPriceLow = this.editForm.value.currentStockPrice;
    }
    if(parseFloat(this.editForm.value.stockPriceHigh) <  parseFloat(this.editForm.value.currentStockPrice)) {
      this.editForm.value.stockPriceHigh = this.editForm.value.currentStockPrice;
    }
    this.companyService.updateCompany(this.editForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/company']);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }
}
