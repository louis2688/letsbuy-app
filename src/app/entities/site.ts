import { SelectableCategory } from "./category";
import { Product } from "./product";

export class Site{
    public siteId: string="";
    public logo: string = "";
    public name: string = "";
    public description: string = "";
    public address: string = "";
    public profit_from: number = 0;
    public profit_to: number = 0;
    public categories: SelectableCategory[]=[];
    public isFavor: boolean = false;

    constructor(
        _logo: string,
        _name: string,
        _description: string,
        _address: string,
        _profit_from: number,
        _profit_to: number
    )

    {
        this.logo = _logo;
        this.name = _name;
        this.description = _description;
        this.address = _address;
        this.profit_from = _profit_from;
        this.profit_to = _profit_to;
    }

}

export class SellsItem {
    sellsList: Sale[] = [];
    mostProfitable: Product = new Product();
    mostSellable: Product = new Product();
    totalProfit:number;
    thirtyDayProfit:number;
    lastMonthProfit:number;
    totalSells:number;
    thirtyDaySells:number;
    lastMonthSells:number;
}

export class Sale {
    public profit: number=0;
    public siteName: string="";
    public time: Date = new Date();
    public productDesc: string="";
    public buyerID: string="-1";
    public buyerFName: string="";
    public buyerLName: string="";
    public buyerPicture: string="";
    public isOpen: boolean = false;
    public buyerFollow: boolean = false;
    public payed: boolean;

    
}