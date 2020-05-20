import { Injectable } from '@angular/core';
import { Site } from '../entities/site';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
import { LocalStorage } from './LocalStorage';
import { UserProfileService } from './UserProfileService';
import { Question } from '../entities/faq';
import { SelectableCategory, Language, Location } from '../entities/category';


@Injectable()
export class ResourcesService {
    constructor(private _http: SecureHttp, private _strings: ShaerdStrings) { }

    public async UpdateCategories(): Promise<void> {
        var version_url = this._strings.cat_getVersion;
        var items_url = this._strings.cat_getItems;
        var items_store_key = ShaerdStrings.keys_categories_items;

        //Get user
        var user_profile = UserProfileService.GetUserProfile();
        // Try update
        user_profile.categoriesVer = await this.UpdateResource(version_url, user_profile.categoriesVer, items_url, items_store_key);
        // Update resource version
        UserProfileService.UpdateUserProfile(user_profile);
    }
    public async UpdateLocations(): Promise<void> {

        var version_url = this._strings.loc_getVersion;
        var items_url = this._strings.loc_getItems;
        var items_store_key = ShaerdStrings.keys_loc_items;

        //Get user
        var user_profile = UserProfileService.GetUserProfile();
        // Try update
        user_profile.countriesVer = await this.UpdateResource(version_url, user_profile.countriesVer, items_url, items_store_key);
        // Update resource version
        UserProfileService.UpdateUserProfile(user_profile);
    }
    public async UpdateLangs(): Promise<void> {

        var version_url = this._strings.langs_getVersion;
        var items_url = this._strings.langs_getItems;
        var items_store_key = ShaerdStrings.keys_languages_items;


        //Get user
        var user_profile = UserProfileService.GetUserProfile();
        // Try update
        user_profile.languagesVer = await this.UpdateResource(version_url, user_profile.languagesVer, items_url, items_store_key);
        // Update resource version
        UserProfileService.UpdateUserProfile(user_profile);
    }

    public async GetFaq() {
        return this._http._get<Question>(this._strings.faq_getItems);
    }

    public ToggleSiteFollow(siteId: string) {
        var url = this._strings.get_toggleSite + "?siteid=" + siteId;
        return this._http._get<boolean>(url);
    }

    public GetLocations(): Location[] {
        return this.GetResource<Location>(ShaerdStrings.keys_loc_items);
    }
    public GetCategories(): SelectableCategory[] {
        var items = this.GetResource<SelectableCategory>(ShaerdStrings.keys_categories_items);
        var general = items.filter(x=>x.name == "General" || x.Name == "General");
        var others = items.filter(x=>x.name != "General" && x.Name != "General");

        var result = [];
        general.forEach(element => {
            result.push(element);
        });
        others.forEach(element => {
            result.push(element);
        });
        return result;
    }
    public GetLangs(): Language[] {
        return this.GetResource<Language>(ShaerdStrings.keys_languages_items);
    }

    public GetSites() {
        return this._http._get<Site>(this._strings.get_sites);
    }
    public HasNewTosVersion() {
        return this._http._get<Boolean>(this._strings.tos_hasNewVersion);
    }
    public GetLastTosVersion() {
        return this._http._get<string>(this._strings.tos_getNewVersion);
    }
    public ApproveTosNewVersion() {
        return this._http._get<Boolean>(this._strings.tos_agreeToNewVersion);
    }

    private async UpdateResource(version_url: string, currentVersion: number, items_url: string, items_store_key: string): Promise<number> {
        if (!this.isBrowser()) {
            return Promise.resolve(-1);
        }
        var tryUpdate = await this._http._get<number>(version_url)
            .then(async res => {
                var server_version = 0;
                var data = res;
                if (data != null) {
                    server_version = data.Singel;
                }

                if (currentVersion == 0 || currentVersion < server_version || !LocalStorage.GetItem(items_store_key) ) {
                    var updateResult = await this._http.get(items_url)
                        .then(res => {
                            var data = res.json();
                            if (data != null) {
                                LocalStorage.SetItem(items_store_key, data.List);
                            }
                            return server_version;
                        }, err => { return false; })

                    return updateResult;
                }

                return currentVersion;
            }, err => { return currentVersion; })

        return Promise.resolve(-1);
    }
    private GetResource<T>(key : string): T[] {
        let result = [];
        try {
            var value = LocalStorage.GetItem(key);
            if (value != null && value.length > 0) {
                result = value;
            }
            return result;
        } catch (e) {
            return [];
        }
    }
    private isBrowser() {
        try {
            if (navigator != null) {
                return true;
            }
        } catch (e) {

        }
        return false;
    }

}