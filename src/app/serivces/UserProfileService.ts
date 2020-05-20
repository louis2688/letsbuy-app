import { Injectable } from '@angular/core';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
import { LocalStorage } from './LocalStorage';
import { UserProfile } from '../entities/base';
import { userReviewPage, userReview, Chat, User, BankAccount } from '../entities/user';
import { RegisterUserData } from '../entities/auth';
@Injectable()
export class UserProfileService {


    constructor(private http: SecureHttp, private str: ShaerdStrings) { }

    public async LoadProfileFromServer() {
        var url = this.str.user_getProfile;
        var result = await this.http._get<UserProfile>(url);
        if (result.isOk) {
            var user = result.Singel;
            user.isGuest = false;
            UserProfileService.UpdateUserProfile(user);
        }
    }

    public GetUserReviews(id: string, all: boolean) {
        var url = this.str.user_getAllReviews + "?id=" + id + "&all=" + all;
        return this.http._get<userReviewPage>(url);
    }
    public UpdateReview(data: userReview) {
        return this.http._post<boolean>(this.str.user_updateReview, data);
    }

    public GetUserChatsList() {
        return this.http._get<Chat>(this.str.user_allChats);
    }

    public GetShortUSerData(id: string) {
        var url = this.str.user_getShortUser + "?id=" + id;
        return this.http._get<User>(url);
    }

    public ToggleFavorite(id: string) {
        var url = this.str.user_toogle_favorite + "?id=" + id;
        return this.http._get<boolean>(url);
    }

    public SendRestPassWord(mail: string) {
        var url = this.str.user_get_settings
        return this.http.get(this.str.user_get_settings);
    }

    public GetUserSettings() {
        return this.http._get<User>(this.str.user_get_settings);
    }
    public async PostUserLangs(items: number[]) {
        return this.http._post<boolean>(this.str.user_updateLangs, items);
    }

    public async PostUserData(model: RegisterUserData) {
        model.Bithday = new Date();
        var result = await this.http._post<boolean>(this.str.user_registerData, model);
        await this.LoadProfileFromServer();
        return result;
    }

    public async UploadProfileImage(data: FormData) {
        var result = await this.http.postFile<string>(this.str.user_profileImage, data);
        await this.LoadProfileFromServer();
        return result;
    }

    public UpdateBankAccount(model: BankAccount){
        return this.http._post<boolean>(this.str.user_update_bank,model);
    }
    public GetBankAccount(){
        return this.http._get<BankAccount>(this.str.user_get_bank);
    }
    public UpdateUserCategories(items : string[]) {
        return this.http._post<boolean>(this.str.user_update_categories, items);
    }

    public static GetUserProfile() {
        var userProfile: UserProfile;
        userProfile = LocalStorage.GetItem(ShaerdStrings.keys_userProfile);
        if (!userProfile) {
            userProfile = UserProfileService.ResetProfile();
        }
        return userProfile;
    }

    public static ResetProfile() {
        var userProfile = new UserProfile();
        LocalStorage.SetItem(ShaerdStrings.keys_userProfile, userProfile);
        return userProfile;
    }

    public static UpdateUserProfile(user: UserProfile) {
        LocalStorage.SetItem(ShaerdStrings.keys_userProfile, user);
    }

    public static NeedToUpdateResources() {
        var profile = UserProfileService.GetUserProfile();

        var updateFromDate = new Date();
        updateFromDate.setDate(updateFromDate.getDate() - 1);

        return updateFromDate > profile.lastUpdate;
    }



 

}
