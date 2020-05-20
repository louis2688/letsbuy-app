import { Component } from '@angular/core';
import { LanguageService, LinksService, UserProfileService } from '../../serivces/index';
import { ActivatedRoute } from '@angular/router';
import { Product, Deal } from "../../entities/product";
import { User } from "../../entities/user";
import { SelectableCategory, Language } from "../../entities/category";

@Component({
    selector: 'Deal',
    templateUrl: './Deal.component.html',
    styleUrls: ['./Deal.component.css'],
    providers:[LinksService,UserProfileService]
})
export class DealComponent {
    public DealId: string;

    public item: Deal = new Deal();
    public seller: User = new User();

    public __deal_title: string = "";
    public __deal_subtitle: string = "";
    public __deal_from: string = "";
    public __to_blog: string = "";
    public __deal_prev_btn: string = "";
    public __deal_next_btn: string = "";
    public __deal_share_btn: string = "";
    public __date: string = "";
    public __chat: string = "";
    public __sales: string = "";
    public __specialities: string = "";

    constructor(router: ActivatedRoute,private service : LinksService,private user : UserProfileService) {
        this.DealId = router.snapshot.params['id'];
        this.service.GetDeal(this.DealId).then(x=>{
            if(x.isOk){
                this.item = x.Singel;

                this.user.GetShortUSerData(this.item.sellerID).then(y=>{
                    if(y.isOk){
                        this.seller = y.Singel;
                    }
                })
            }
        })
        this.InitText();

    }


    InitText() {
        this.__deal_title = LanguageService.GetValue("deal_title");
        this.__deal_subtitle = LanguageService.GetValue("deal_subtitle");
        this.__deal_from = LanguageService.GetValue("deal_from");
        this.__to_blog = LanguageService.GetValue("to_blog");
        this.__deal_prev_btn = LanguageService.GetValue("deal_prev_btn");
        this.__deal_next_btn = LanguageService.GetValue("deal_next_btn");
        this.__deal_share_btn = LanguageService.GetValue("deal_share_btn");
        this.__date = LanguageService.GetValue("date");
        this.__chat = LanguageService.GetValue("chat");
        this.__sales = LanguageService.GetValue("sales");
        this.__specialities = LanguageService.GetValue("specialities");
    }
}
