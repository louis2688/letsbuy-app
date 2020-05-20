export class Product {
    public id: string="";
    public img: string="";
    public description: string="";
    public site: string="";
    public coinIcon: string="";
    public profit: number=0;
    public sales: number=0;

    public specImg: string="";
    public date: Date= new Date();

}

export class Deal extends Product{
    public sellerID : string;
}