import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserProfileService, AuthenticationService } from '../serivces'


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (AuthenticationService.isAuthenticated()) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/Signin']);
        return false;
    }
}

@Injectable()
export class UserProfileGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        try {
            var user = UserProfileService.GetUserProfile();
            return true;
        } catch (e) {

        }
        // not logged in so redirect to login page
        this.router.navigate(['/Signin']);
        return false;
    }
}

@Injectable()
export class OnlyMember implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        try {
            var user = UserProfileService.GetUserProfile();
            return !user.isGuest;
        } catch (e) {

        }
        // not logged in so redirect to login page
        this.router.navigate(['/Signin']);
        return false;
    }
}
