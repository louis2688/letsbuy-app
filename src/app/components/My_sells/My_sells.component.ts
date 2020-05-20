import { Component, ViewChild,OnDestroy } from '@angular/core';
import { LanguageService } from '../../serivces/index';
import { Sale, SellsItem } from "../../entities/site";
import { ToastComponent } from "../Toast/Toast.component";
import { LocalStorage } from "../../serivces/LocalStorage";
import { LinksService } from "../../serivces/LinksManager";

@Component({
    selector: 'My_sells',
    templateUrl: './My_sells.component.html',
    styleUrls: ['./My_sells.component.css'],
    providers: [LinksService]
})
export class My_sellsComponent implements OnDestroy {
    private storageKey = "page_mysells";
    public coinIcon: string = "$";

    model: SellsItem = new SellsItem();

    isTouchedProfitable: boolean;
    isTouchedSellable: boolean;

    @ViewChild(ToastComponent) childcmp!: ToastComponent;

    public __my_sells_title: string="";
    public __money_earned: string="";
    public __total: string="";
    public __month: string="";
    public __prev_month: string="";
    public __most: string="";
    public __profitable: string="";
    public __sellable: string="";
    public __product: string="";
    public __sales_info: string="";
    public __sent2u: string="";
    public __to_link: string="";
    public __sales: string="";
    public __Sales: string="";
    public __from: string="";
    public __at: string="";
    public __chat: string="";
    public __buyer: string="";
    public __price: string="";
    public __profit_per_unit: string="";

    constructor(private service: LinksService) {
        this.InitText();
        var fromStore = LocalStorage.GetItem(this.storageKey);

        if(fromStore && typeof(fromStore) === "object"){
            this.model = fromStore;
        }
        this.service.GetSellsItem().then(x =>{
            if(x.isOk){
                this.model = x.Singel;
            }
        });
    }

    ngOnDestroy(): void {
        LocalStorage.SetItem(this.storageKey, this.model);
    }

    click(s: Sale, event: any, item: any) {
        if (event.target.className.includes("allowed_toggle")) {
            s.isOpen = !s.isOpen;
        }
    }
    public UploadMessage(msg: string = "") {
        this.childcmp.ToggleToast(msg);
    }

    ToggleIsFollow(s: Sale) {
        s.buyerFollow = !s.buyerFollow;
        if (s.buyerFollow) {
            this.UploadMessage("Now you are following this specialist too");
        }
        else {
            this.UploadMessage("Now you are not following this specialist");
        }
    }
    ToggleProfitable() {
        this.isTouchedProfitable = !this.isTouchedProfitable;
    }
    ToggleSellable() {
        this.isTouchedSellable = !this.isTouchedSellable;
    }
    InitText() {
        this.__my_sells_title = LanguageService.GetValue("my_sells_title");
        this.__money_earned = LanguageService.GetValue("money_earned");
        this.__total = LanguageService.GetValue("total");
        this.__month = LanguageService.GetValue("month");
        this.__prev_month = LanguageService.GetValue("prev_month");
        this.__most = LanguageService.GetValue("most");
        this.__profitable = LanguageService.GetValue("profitable");
        this.__sellable = LanguageService.GetValue("sellable");
        this.__product = LanguageService.GetValue("product");
        this.__sales_info = LanguageService.GetValue("sales_info");
        this.__sent2u = LanguageService.GetValue("sent2u");
        this.__to_link = LanguageService.GetValue("to_link");
        this.__sales = LanguageService.GetValue("sales");
        this.__Sales = LanguageService.GetValue("Sales");
        this.__from = LanguageService.GetValue("from");
        this.__at = LanguageService.GetValue("at");
        this.__chat = LanguageService.GetValue("chat");
        this.__buyer = LanguageService.GetValue("buyer");
        this.__price = LanguageService.GetValue("price");
        this.__profit_per_unit = LanguageService.GetValue("profit_per_unit");
    }
}

