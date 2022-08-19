export interface Company {
  _id?: any;
  companyCEO: string;
  companyCode: string;
  companyName: string;
  date?: Date;
  companyWebSite?: string;
  emailId: string;
  stockExchange: string;
  stockPriceHigh?: any;
  stockPriceLow?: any;
  currentStockPrice?: any;
  volume?:any;
  marketcap?:any;
}
