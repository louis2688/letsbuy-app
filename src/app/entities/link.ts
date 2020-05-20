export class Folder {
    constructor(items: number, links: string[], _name: string) {
        this.itemsAmount = items;
        this.images = links;
        this.name = _name;
    }
    public id: string = "-1";
    public name:string="";
    public itemsAmount: number;
    public images: string[];
}

export class FolderItem {
    public id:string="";
    public description:string="";
    public site:string="";
    public price: number=0;
    public coinIcon:string="";
    //public profit: number;
    public picture:string="";
    public isfocus: boolean = false;
    public linkUrl: string = "";
    public linkID: string = "";
    public categoryID:string="";
    public folderID:string="";
    public folderName:string="";
    public _folderName:string="";
    public _catName:string="";
    public isInWish : boolean;
}