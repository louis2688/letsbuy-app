import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinksService, LocalStorage, ShaerdStrings, UserProfileService } from 'src/app/serivces';
import { Location } from '@angular/common';


@Component({
    templateUrl: './GoToLink.component.html',
    selector: 'GoToLink',
    providers: [LinksService]
})
export class GoToLinkComponent {

    isGuest: boolean = false;
    constructor(router: ActivatedRoute, service: LinksService, location: Location) {
        // var user = UserProfileService.GetUserProfile();

        // if(!user.isGuest){
        //     var mobileMode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";
        //     var id = router.snapshot.params['id'];
        //     service.GoToLink(id).then(x => {
        //         var url = x.json();
        //         if(mobileMode){
        //             url = "hybrid:openlink?url=" + encodeURI(url);
        //             setTimeout(() => {
        //                 location.back();
        //             }, 500);
        //         }
        //         window.location.href = url;
        //     });
        // }
        // else{
        //     this.isGuest = true;
        // }

        var mobileMode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";
        var id = router.snapshot.params['id'];
        service.GoToLink(id).then(x => {
            console.log(x);
            var url = x.json();
            if (mobileMode) {
                url = "hybrid:openlink?url=" + encodeURI(url);
                setTimeout(() => {
                    location.back();
                }, 500);
            }
            window.location.href = url;
        }).catch(er => { console.log(er) });

    }
}



