import { Component, Input } from '@angular/core';
import { UserProfileService } from '../../serivces/index';


@Component({
    selector: 'Follow',
    templateUrl: './Follow.component.html',
    styleUrls: ['./Follow.component.css']

})

export class FollowComponent  {
    @Input() spec_id: string = "";
    @Input() isFollow: boolean=false;

    public click() {
        var localProfile = UserProfileService.GetUserProfile();
        if (!localProfile.isGuest) {
            this.isFollow = !this.isFollow;
        }
    }
}
