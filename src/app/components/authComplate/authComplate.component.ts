import { Component, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserProfileService, SendBirdService } from '../../serivces/index';
import { RegisterExternalViewModel } from '../../entities/index';


@Component({
    selector: 'authComplate',
    templateUrl: './authComplate.component.html',
    styleUrls: ['./authComplate.component.css'],
    providers: [UserProfileService, SendBirdService]
})
export class authComplateComponent  {

    external_access_token: string;
    provider: string;
    external_user_name: string;
    haslocalaccount: boolean;

    constructor(activatedRoute: ActivatedRoute,
        private router: Router,
        private user: UserProfileService,
        private auth: AuthenticationService,
        private sbService: SendBirdService) {
        this.external_access_token = activatedRoute.snapshot.params['external_access_token'];
        this.provider = activatedRoute.snapshot.params['provider'];
        this.external_user_name = activatedRoute.snapshot.params['external_user_name'];
        this.haslocalaccount = activatedRoute.snapshot.params['haslocalaccount'] == "True" ? true : false;
    }

    async Next() {
        if (this.haslocalaccount) {
            var result = await this.auth.LoginExternal(this.provider, this.external_access_token);
            await this.user.LoadProfileFromServer();
        }
        else {
            var data = new RegisterExternalViewModel();
            data.ExternalAccessToken = this.external_access_token;
            data.Provider = this.provider;
            data.UserName = this.external_user_name;
            var result = await this.auth.RegisterExternal(data);
            await this.user.LoadProfileFromServer();
        }

        this.sbService.RegisterUserNotifications();
        this.router.navigate(['Signup']);

    }


}
