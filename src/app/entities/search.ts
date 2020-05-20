import { SelectableCategory } from "./category";

export class Query {
    constructor() {
        this.online = true;
        this.favorite = true;
        this.langID = -1;
        this.locationID = -1;
    }

    public categories: string[]=[];
    public online: boolean = false;
    public favorite: boolean = false;
    public langID: number;
    public locationID: number;
}

export class QueryResult {
    public id: string="";
    public image: string="";
    public name: string="";
    public isOnline: boolean = false;
    public isFavorite: boolean = false;
    public sales: number=0;
    public ratesAvg: number=0;
    public categories: string[]=[];
}


export class ProductQueryResult {

    public id: string="";
    public imageUrl: string="";
    public ProfileImageUrl: string="";
    public productDesc: string="";
    public siteName: string="";
    public url: string="";
    public price: number;
    public pricePattern: string="";

    public specID: string="";
    public specName: string="";
    public specRate: number;
    public specSales: number;
    public specOnline: boolean;
    public specialitiesList: SelectableCategory[]=[];

    public isFoucs: boolean;
    public isInWishList: boolean;
    public isFollow: boolean;

    constructor(
        _id: string,
        _imageUrl: string,
        _ProfileImageUrl: string,
        _productDesc: string,
        _siteName: string,
        _url: string,
        _price: number,
        _pricePattern: string,
        _specID: string,
        _specName: string,
        _specRate: number,
        _specSales: number,
        _specOnline: boolean,
        _isInWishList: boolean,
        _isFollow: boolean
    ) {
        this.id = _id;
        this.imageUrl = _imageUrl;
        this.ProfileImageUrl = _ProfileImageUrl;
        this.productDesc = _productDesc;
        this.siteName = _siteName;
        this.url = _url;
        this.price = _price;
        this.pricePattern = _pricePattern;
        this.specID = _specID;
        this.specName = _specName;
        this.specRate = _specRate;
        this.specSales = _specSales;
        this.specOnline = _specOnline;
        this.isFoucs = false;
        this.isInWishList = _isInWishList;
        this.isFollow = _isFollow;
    }

}
