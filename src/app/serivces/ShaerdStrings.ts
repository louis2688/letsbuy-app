import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ShaerdStrings {
    // Vars
    public static defultImagePerson = "/assets/images/default_spec_pic.png";

    // Keys for local storage
    public static keys_token = "_t";
    public static keys_rtoken = "_rt";
    public static keys_tokenExp = "_texp";

    public static keys_userProfile = "_UP";

    public static keys_categories_items = "RES_CAT";
    public static keys_languages_items = "RES_LANGS";
    public static keys_loc_items = "RES_LOC";

    public static keys_lang_current = "_lang_current";
    public static keys_lang_dic = "_lang_dic_";

    public static keys_chat_items = "CHAT_I";

    public static keys_platform = "PLATFORM";


    // C# controllers names
    private tos_controller = "TermsOfUse";
    private res_controller = "resources";
    private user_controller = "Users";
    private chat_controller = "Chats";
    private account_controller = "api/Account";
    private lang_controller = "Language";
    private query_controller = "Search";
    private blog_controller = "Blogs";
    private link_controller = "Links";

    // Urls for api calls

    //Logins
    public googleAuthUtl(): string {
        if (this.IsBroswer()) {
            return this.BaseUrlAuthServer() + "/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=ngApp&redirect_uri=" + document.getElementsByTagName('base')[0].href + "authComplate";
        }
        return "";
    }
    public facebookAuthUtl(): string {
        if (this.IsBroswer()) {
            return this.BaseUrlAuthServer() + "/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=ngApp&redirect_uri=" + document.getElementsByTagName('base')[0].href + "authComplate";
        }
        return "";
    }

    // TermsOfUse
    public tos_hasNewVersion = this.UrlAction(this.tos_controller, "HasNewVersion");
    public tos_getNewVersion = this.UrlAction(this.tos_controller, "GetLastVersion");
    public tos_agreeToNewVersion = this.UrlAction(this.tos_controller, "ApproveVersion");

    // Caregotys
    public cat_getItems = this.UrlAction(this.res_controller, "GetCategories");
    public cat_getVersion = this.UrlAction(this.res_controller, "CategoriesVersion");

    // Locations
    public loc_getItems = this.UrlAction(this.res_controller, "GetLocations");
    public loc_getVersion = this.UrlAction(this.res_controller, "LocationsVersion");

    // Languages
    public langs_getItems = this.UrlAction(this.res_controller, "GetLanguages");
    public langs_getVersion = this.UrlAction(this.res_controller, "LanguagesVersion");

    //Sites
    public get_sites = this.UrlAction(this.res_controller, "GetSites");
    public get_toggleSite = this.UrlAction(this.res_controller, "ToggleSite");

    //Faq
    public faq_getItems = this.UrlAction(this.res_controller, "GetFAQ");

    //ContactUs
    public contactUs_post = this.UrlAction(this.res_controller, "ContactUs");


    // Auth
    public auth_register = this.UrlAction(this.account_controller, "Register", "auth");
    public auth_external_register = this.UrlAction(this.account_controller, "RegisterExternal", "auth");
    public auth_external_login = this.UrlAction(this.account_controller, "ObtainLocalAccessToken", "auth");
    public auth_get_reset_password = this.UrlAction(this.account_controller, "ResetPassword", "auth");
    public auth_token = this.UrlAction('', "token", "auth");

    // Lang
    public lang_getFile = this.UrlAction(this.lang_controller, "GetFile");

    // Users
    public user_signupstep = this.UrlAction(this.user_controller, "SingupStep");
    public user_mailValid = this.UrlAction(this.user_controller, "MailValidation");
    public user_registerData = this.UrlAction(this.user_controller, "RegisterUserData");
    public user_updateLangs = this.UrlAction(this.user_controller, "UpdateUserLangs");
    public user_completeSignup = this.UrlAction(this.user_controller, "CompleteSignup");
    public user_getMail = this.UrlAction(this.user_controller, "GetUserMail");
    public user_registerExternal = this.UrlAction(this.user_controller, "RegisterExternalUser");
    public user_getProfile = this.UrlAction(this.user_controller, "GetUserProfile");
    public user_profileImage = this.UrlAction(this.user_controller, "UploadProfileImage");
    public user_get_settings = this.UrlAction(this.user_controller, "GetUserSettingViewModel");
    public user_update_categories = this.UrlAction(this.user_controller, "UpdateCategories");
    public user_update_bank = this.UrlAction(this.user_controller, "UpdateBankDetails");
    public user_get_bank = this.UrlAction(this.user_controller, "GetBankDetails");
    public user_get_sbToken = this.UrlAction(this.chat_controller, "GetSendbirdToken");
    public user_reset_password = this.UrlAction(this.user_controller, "ResetPassword");
    public user_toogle_favorite = this.UrlAction(this.user_controller, "ToogleFavorite");
    public user_allChats = this.UrlAction(this.chat_controller, "UserChats");
    public user_getShortUser = this.UrlAction(this.user_controller, "GetShortUser");
    public user_updateReview = this.UrlAction(this.user_controller, "UpdateReview");
    public user_getAllReviews = this.UrlAction(this.user_controller, "GetAllReviews");
    public user_canAddReview = this.UrlAction(this.user_controller, "CanAddReview");
    public user_mySells = this.UrlAction(this.user_controller, "MySells");
    public user_myBuy = this.UrlAction(this.user_controller, "MyBuys");


    //Query
    public query_add = this.UrlAction(this.query_controller, "Query");
    public query_get = this.UrlAction(this.query_controller, "QueryResult");
    public query_product_add = this.UrlAction(this.query_controller, "ProductQuery");
    public query_product_get = this.UrlAction(this.query_controller, "ProductQueryResult");
    public query_best_spec = this.UrlAction(this.query_controller, "BestSpec");


    //Blogs
    public blog_bestBlogs = this.UrlAction(this.blog_controller, "BestBlogs");
    public blog_getBlog = this.UrlAction(this.blog_controller, "GetBlog");
    public blog_updateCoverImage = this.UrlAction(this.blog_controller, "UploadCoverImage");
    public blog_updateBlog = this.UrlAction(this.blog_controller, "UpdateBlog");

    public blog_newPost = this.UrlAction(this.blog_controller, "AddPost");
    public blog_updatePost = this.UrlAction(this.blog_controller, "UpdatePost");
    public blog_deletePost = this.UrlAction(this.blog_controller, "DeletePost");
    public blog_GetPost = this.UrlAction(this.blog_controller, "GetPost");
    public blog_post_uploadImage = this.UrlAction(this.blog_controller, "UpdatePostImage");
    public blog_togglePin = this.UrlAction(this.blog_controller, "TogglePinPost");



    //Links
    public link_getAll = this.UrlAction(this.link_controller, "GetAll");
    public link_general = this.UrlController(this.link_controller);
    public link_get = this.UrlAction(this.link_controller, "Link");
    public link_testUrl = this.UrlAction(this.link_controller, "TestURL");
    public link_linkImage = this.UrlAction(this.link_controller, "LinkImage");
    public link_FolderItems = this.UrlAction(this.link_controller, "GetFolderItems");
    public link_gotolink = this.UrlAction(this.link_controller, "GoToLink");
    public link_delete = this.UrlAction(this.link_controller, "Delete");
    public link_getData = this.UrlAction(this.link_controller, "GetUrlData");
    public link_getDeal = this.UrlAction(this.link_controller, "Deal");



    public user_toogle_wishlist = this.UrlAction(this.link_controller, "ToogleWishlist");
    public user_wishlist = this.UrlAction(this.link_controller, "Wishlist");

    hybrid = this.UrlAction("hybrid", "openlink");;


    public static PRUD_RES_URL = "";
    public static AUTH_RES_URL = "";


    // Helprs 
    private BaseUrlResourceServer(): string {
        //return this.IsInDevMode() ? "http://192.168.1.92/LetsBuy.Api/api/" : ShaerdStrings.PRUD_RES_URL;
        return this.IsInDevMode() ? "http://localhost:31320/api/" : ShaerdStrings.PRUD_RES_URL;
    }

    private BaseUrlAuthServer(): string {
        //return this.IsInDevMode() ? "http://192.168.1.92/LetsBuy.AuthServer/" : ShaerdStrings.AUTH_RES_URL;
        return this.IsInDevMode() ? "http://localhost:54510/" : ShaerdStrings.AUTH_RES_URL;
    }



    private IsInDevMode(): boolean {
        if (this.IsBroswer()) {
            return /localhost/.test(document.location.host);
        }
        return false;
    }

    private IsBroswer(): boolean {
        try {
            if (document != null) {
                return true;
            }
        } catch (e) {

        }

        return false;
    }

    private UrlController(controller: string): string {
        var base_url = this.BaseUrlResourceServer();
        return base_url + controller;
    }
    private UrlAction(controller: string, action: string, server: string = 'resource'): string {
        var base_url = "";
        switch (server.toLowerCase()) {
            case "auth":
                base_url = this.BaseUrlAuthServer();
                break;
            case "resource":
                base_url = this.BaseUrlResourceServer();
                break;
            default:
                return "";
        }
        if (controller.length > 0) {
            base_url = base_url + controller + '/';
        }
        return base_url + action;
    }
}