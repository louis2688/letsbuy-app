import { Component, Input } from '@angular/core';
import { LinksService } from '../../serivces';


@Component({
    selector: 'Bag',
    templateUrl: './Bag.component.html',
    styleUrls: ['./Bag.component.css'],
    providers: [LinksService]
})

export class BagComponent  {
    @Input() item_id: string = "";
    @Input() isInWishList: boolean = false;

    constructor(private linkService: LinksService) { }

    public click() {
        //ToggleWishlist
        this.linkService.ToggleWishlist(this.item_id).then(x => {
            if (x.isOk) {
                this.isInWishList = !this.isInWishList;
            }
        })
    }
}
