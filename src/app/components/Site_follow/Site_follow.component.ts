import { Component, Input } from '@angular/core';
import { UserProfileService } from '../../serivces/index';
import { ResourcesService } from "../../serivces/ResourcesService";


@Component({
    selector: 'Site_follow',
    templateUrl: './Site_follow.component.html',
    styleUrls: ['./Site_follow.component.css'],
    providers: [ResourcesService]

})

export class Site_followComponent  {
    @Input() site_id: string="";
    @Input() isFollow: boolean = false;

    constructor(private resService: ResourcesService) { }

    public click() {
        var localProfile = UserProfileService.GetUserProfile();
        if (!localProfile.isGuest) {
            this.resService.ToggleSiteFollow(this.site_id).then(x => {
                if (x.isOk) {
                    this.isFollow = !this.isFollow;
                }
            })
        }
    }
}
