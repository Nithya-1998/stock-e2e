import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/service/Company';
import { CompanyService } from 'src/app/service/company-service/company.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

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

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAllcompanies().subscribe(response => {
      this.companyList = response;
    });
  }
  exportExcel() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Company Stock Sheet');

    worksheet.columns = [
      { header: 'Co. Code', key: 'code', width: 10 },
      { header: 'Co. Name', key: 'name', width: 32 },
      { header: 'Stock Exc', key: 'stockExc', width: 10 },
      { header: 'Todays High', key: 'high', width: 10 },
      { header: 'Todays Low', key: 'low', width: 10, style: { font: { name: 'Arial Black', size:10} } },
    ];

    this.companyList.forEach(e => {
      worksheet.addRow({code: e.companyCode, name: e.companyName, stockExc:e.stockExchange, high:e.stockPriceHigh, low:e.stockPriceLow },"n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })

  }

}
