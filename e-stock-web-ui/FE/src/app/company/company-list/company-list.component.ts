import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/service/Company';
import { CompanyService } from 'src/app/service/company-service/company.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  "companyList": Company[];
  "company": Company;
  "companyId": string;
  p: number = 1;
  count: number = 5;
  filter = new Subject();
  "name" = localStorage.getItem("emailId");
  "isAdmin" = false;
  "cardView" = true;
  "downloaded" = false;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAllcompanies().subscribe(response => {
      this.companyList = response;
    });

  }

  viewStocks(event: any, company: Company){
    console.log("View company", company);
  }

  editStocks(event: any, company: Company){
    console.log("Add company", company);
  }
  toggleView(event:any){
    this.cardView = !this.cardView;
  }

  viewMore(companyId: string) {
    console.log("Inside parent View More"+companyId);
    this.companyId = companyId;
  }

  removeCompanyFromList(companyCode: string) {
    console.log("Delete"+ companyCode);
    this.companyService.deleteCompany(companyCode).subscribe((data) => {
      console.log(data);
      this.companyService.getAllcompanies().subscribe(response => {
        console.log(data);
        this.companyList = response;
      });
    });
  }
  exportExcel() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Company Stock Sheet');

    worksheet.columns = [
      { header: 'Co. Code', key: 'code', width: 10 },
      { header: 'Co. Name', key: 'name', width: 32 },
      { header: 'Stock Exc', key: 'stockExc', width: 10 },
      { header: 'Current Price', key: 'currentPrice', width: 32 },
      { header: 'Volume', key: 'volume', width: 10 },
      { header: 'Todays High', key: 'high', width: 10 },
      { header: 'Todays Low', key: 'low', width: 10 },
      { header: 'Market Cap (Cr)', key: 'marketcap', width: 10 },
    ];

    this.companyList.forEach(e => {
      worksheet.addRow({code: e.companyCode, name: e.companyName, stockExc:e.stockExchange, volume: e.volume, currentPrice: e.currentStockPrice , high:e.stockPriceHigh, low:e.stockPriceLow, marketcap: e.marketcap },"n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CompanyStockInfo.xlsx');
      setTimeout(() => {
        this.downloaded = false;
      }, 2000);
      this.downloaded = true;
    })

  }

}
