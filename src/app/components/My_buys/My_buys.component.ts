import { Component ,OnDestroy} from '@angular/core';
import { LanguageService, LinksService } from '../../serivces/index';
import { Product } from "../../entities/product";
import { LocalStorage } from "../../serivces/LocalStorage";

@Component({
    selector: 'My_buys',
    templateUrl: './My_buys.component.html',
    styleUrls: ['./My_buys.component.css'],
    providers:[LinksService]
})
export class My_buysComponent implements OnDestroy{
   
    public items: Product[] = [];
    private storageKey = "page_buys";

    public filter: string = "";
    
    public __my_buys_subtitle: string = "";
    public __search_item: string = "";
    public __my_buys_title: string = "";
    public __date: string = "";

    constructor(private service: LinksService) {
        this.InitText();
        var fromStore = LocalStorage.GetItem(this.storageKey);

        if(fromStore && typeof(fromStore) === "object"){
            this.items = fromStore;
        }
        this.service.GetBuys().then(x =>{
            if(x.isOk){
                this.items = x.List;
            }
        });
    }
    ngOnDestroy(): void {
        LocalStorage.SetItem(this.storageKey, this.items);
    }

    
    InitText() {
        this.__my_buys_subtitle = LanguageService.GetValue("my_buys_subtitle");
        this.__search_item = LanguageService.GetValue("search_item");
        this.__my_buys_title = LanguageService.GetValue("my_buys_title");
        this.__date = LanguageService.GetValue("date");
    }
}
