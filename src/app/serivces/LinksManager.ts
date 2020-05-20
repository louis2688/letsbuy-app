import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { SellsItem } from "../entities/site";
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
import { ProductQueryResult } from '../entities/search';
import { FolderItem, Folder } from '../entities/link';
import { Product, Deal } from '../entities/product';
@Injectable()
export class LinksService {



    
    private base_url: string;

    constructor(private http: SecureHttp, private str: ShaerdStrings, private _http: Http) {
        this.base_url = "";
    }

    GetUserWishlist() {
        var url = this.str.user_wishlist;
        return this.http._get<ProductQueryResult>(url);
    }

    public ToggleWishlist(id: string) {
        var url = this.str.user_toogle_wishlist + "?id=" + id;
        return this.http._get<boolean>(url);
    }

    public async GetFolderItems(id: string) {
        var url = this.str.link_FolderItems + "?id=" + id;
        return this.http._get<FolderItem>(url);
    }

    public async GetAllByCategory() {
        var url = this.str.link_getAll + "?byCategory=true";
        return this.http._get<Folder>(url);
    }

    GoToLink(id: any) {
        var url = this.str.link_gotolink + "?id=" + id;
        return this.http.get(url);
    }

    public async GetAllByFolder() {
        var url = this.str.link_getAll;
        return this.http._get<Folder>(url);
    }

    public GetSellsItem() {
        var url = this.str.user_mySells;
        return this.http._get<SellsItem>(url);
    }

    public GetBuys() {
        var url = this.str.user_myBuy;
        return this.http._get<Product>(url);
    }

    public async Create(data: FolderItem) {
        var url = this.str.link_general;
        return this.http._post<string>(url, data);
    }

    public async UpdateImage(data: FormData, id:string) {
        var url = this.str.link_linkImage + '?id=' + id;
        return this.http.postFile<boolean>(url, data);
    }

    public async Get(id: string) {
        var url = this.str.link_get + "?id=" + id;
        return this.http._get<FolderItem>(url);
    }

    public async GetDeal(DealId: string) {
        var url = this.str.link_getDeal + "?id=" + DealId;
        return this.http._get<Deal>(url);
    }

    public async Upadte(data: FolderItem) {
        var url = this.str.link_general;
        return this.http._put<FolderItem>(url,data);
    }


    public async TestUrl(uri: string) {
        var url = this.str.link_testUrl + "?url=" + encodeURI(uri);
        return this.http._get<boolean>(url); 
    }

    Delete(linkId: string): any {
        var url = this.str.link_delete + "?id=" + linkId;
        return this.http._get<boolean>(url); 
    }

    public async GetLinkMetaData(_url: string) {

        var link = new FolderItem();
        link.linkUrl = _url;

        var url = this.str.link_getData +'?url=' + encodeURI(_url);

        await this.http.get(url).then(res => {
            var data = res.json();
            if (data.status == "OK") {
                link.description = data.title;

                var image = "";
                image = data.image;
                if (image && image.startsWith("https")) {
                    link.picture = data.image;
                }
            }
        })
        return link;
    }
}
