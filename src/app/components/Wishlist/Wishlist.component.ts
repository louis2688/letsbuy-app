import { Component, ViewChild } from '@angular/core';
import { LanguageService } from '../../serivces/index';
import { ProductQueryResult } from "../../entities/search";
import { ToastComponent } from "../Toast/Toast.component";
import { SelectableCategory } from "../../entities/category";
import { ActivatedRoute } from '@angular/router';
import { LocalStorage, LinksService } from "../../serivces/index";
import { ShaerdStrings } from "../../serivces/ShaerdStrings";

@Component({
    selector: 'Wishlist',
    templateUrl: './Wishlist.component.html',
    styleUrls: ['./Wishlist.component.css'],
    providers: [LinksService]
})
export class WishlistComponent {
    public _id: string="";//id for user
    public ItemList: ProductQueryResult[] = [];
    public mobilemode: boolean = false;
    @ViewChild(ToastComponent) childcmp!: ToastComponent;

    public __wishlist_subtitle: string="";
    public __wishlist_search_item: string="";
    public __wishlist_title: string="";
    public __chat: string="";
    public __specialities: string="";
    public __buy_now: string="";

    public searchStr: string="";

    constructor(router: ActivatedRoute, private service: LinksService) {
        this.InitText();
        this._id = router.snapshot.params['id'];
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";

        service.GetUserWishlist().then(x => {
            if (x.isOk) {
                this.ItemList = x.List;
            }
        })

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
        item.isFollow = !item.isFollow;
        if (item.isFollow) {
            this.UploadMessage("Now you are following this specialist too");
        }
        else {
            this.UploadMessage("Now you are not following this specialist");
        }
    }

    RemoveItemFormWishList(i: number, id: string) {
        this.ItemList.splice(i, 1);
        this.service.ToggleWishlist(id);
    }
    DefultImage(e: any) {
        e.target.src = "../../../assets/images/prezent_with_arrow.png";
    }
    InitText() {
        this.__wishlist_subtitle = LanguageService.GetValue("wishlist_subtitle");
        this.__wishlist_search_item = LanguageService.GetValue("wishlist_search_item");
        this.__wishlist_title = LanguageService.GetValue("wishlist_title");
        this.__chat = LanguageService.GetValue("chat");
        this.__specialities = LanguageService.GetValue("specialities"); 
        this.__buy_now = LanguageService.GetValue("buy_now");
    }
}
