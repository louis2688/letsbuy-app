import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { LanguageService, QueryService, productsResultOrderFilter } from '../../serivces/index';
import { Pop_messageComponent } from "../Pop_message/Pop_message.component";
import { ProductQueryResult } from "../../entities/search";
import { ToastComponent } from "../Toast/Toast.component";
import { UserProfileService } from "../../serivces/UserProfileService";
import { LocalStorage } from "../../serivces/LocalStorage";
import { ShaerdStrings } from "../../serivces/ShaerdStrings";


@Component({
    selector: 'Found_product',
    templateUrl: './Found_product.component.html',
    styleUrls: ['./Found_product.component.css'],
    providers: [QueryService, UserProfileService]
})
export class Found_productComponent {
    public showToast: boolean = true;
    public ItemList: ProductQueryResult[] = [];
    public filter: string = "rate";
    public isGuest: boolean=false;
    public mobilemode: boolean=false;

    @ViewChild(ToastComponent) childcmp!: ToastComponent;
    @ViewChild(Pop_messageComponent) login_pop!: Pop_messageComponent;

    //#region Text fileds
    public __found_product_title: string = "";
    public __found_product_subtitle: string = "";
    public __sort_by_rate: string = "";
    public __sort_by_sales: string = "";
    public __sort_by_price: string = "";
    public __chat: string = "";
    public __price: string = "";
    public __msg: string = "";
    public __buy_now: string = "";
    //#endregion

    private id: number;

    constructor(router: ActivatedRoute, private qService: QueryService, private userService: UserProfileService, private nav: Router) {
        this.InitText();
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";
        this.id = router.snapshot.params['id'];
        qService.GetProductQuery(this.id).then(x => {
            if (x.isOk) {
                this.ItemList = x.List;
            }
        })
    }
      

    Sort(val: string, tabIndex: number) {
        this.filter = val;
    }

    public focusOnOff(i: ProductQueryResult, event: any, item: any) {
        if (event.target.className.includes( "allowed_toggle")) {
            i.isFoucs = !i.isFoucs;
        }
        
    }

    public UploadMessage(msg: string = "") {
        this.childcmp.ToggleToast(msg);
    }

    public GetDynamicLinkData(data: string): string {
              
        var url = encodeURI(data);

        var hybridUrl = 'hybrid:openlink?url=' + url;

        return hybridUrl;
    }

    ToggleIsFollow(item: ProductQueryResult) {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.login_pop.LoginPop();
            return;
        }
        else {
            this.userService.ToggleFavorite(item.specID).then(res => {
                if (res.isOk) {
                    if (item.isFollow == true) {
                        this.UploadMessage("You no longer follow this sepc");
                    }
                    else {
                        this.UploadMessage("Now you follow this sepc");
                    }
                    item.isFollow = item.isFollow;
                }
            })

        }
    }


    ToggleWishList(item: ProductQueryResult) {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.login_pop.LoginPop();
            return;
        }
    }

    Go2Chat(specID: string) {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.login_pop.LoginPop();
            return;
        }
        else {
            this.nav.navigate(['/Chat_Speciality', specID]);
        }
    }

    GetProductBG(src: string) {
        if (!src || src == null || src == "" || !src.startsWith("http")) {
            src = "../../../assets/images/prezent_with_arrow.png";
        }

        return "url(" + src + ")";
    }
    private InitText() {
        this.__found_product_title = LanguageService.GetValue("found_product_title");
        this.__found_product_subtitle = LanguageService.GetValue("found_product_sub_title");
        this.__sort_by_rate = LanguageService.GetValue("sort_by_rate");
        this.__sort_by_sales = LanguageService.GetValue("sort_by_sales");
        this.__sort_by_price = LanguageService.GetValue("sort_by_price");
        this.__chat = LanguageService.GetValue("chat");
        this.__price = LanguageService.GetValue("price");
        this.__buy_now = LanguageService.GetValue("buy_now");

        this.__msg = "";
    }
}
