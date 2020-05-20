import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ShaerdStrings } from './ShaerdStrings';
import { LocalStorage } from './LocalStorage';
import { LetsBuyResponse } from '../entities/base';


@Injectable()
export class LanguageService {
    constructor() {
    }

    public async SetSystemLanguage(lang: Languages): Promise<void> {
        if (lang == LanguageService.SystemLang) {
            return;
        }
        var dicKey = ShaerdStrings.keys_lang_dic + lang.toString();
        var LocalResult = LocalStorage.GetString(dicKey);
        if (LocalResult != null && LocalResult.length > 0) {
            LanguageService.CurrentLangValues = LocalResult;
            LocalStorage.SetString(ShaerdStrings.keys_lang_current, lang.toString())
            return;
        }
        var UpdateResult = await this.UpdateLanguageFromServer(lang.toString());
        if (UpdateResult) {
            var dicKey = ShaerdStrings.keys_lang_dic + lang.toString();
            var LocalResult = LocalStorage.GetString(dicKey);
            LanguageService.CurrentLangValues = LocalResult;
            LocalStorage.SetString(ShaerdStrings.keys_lang_current, lang.toString())
            return;
        }
    }

    public UpdateLanguageFromServer(_lang: string) {
        return false;
        // var _string = new ShaerdStrings();

        // return this.http.post(_string.lang_getFile, { lang: _lang })
        //     .then(res => {
        //         var data: LetsBuyResponse<string> = res.json();
        //         if (data.isOk) {
        //             var dicKey = ShaerdStrings.keys_lang_dic + _lang.toString();
        //             LocalStorage.SetString(dicKey, data.Singel);
        //             return true;
        //         }
        //         console.log(data.Errors[0]);
        //         return false;
        //     },
        //     error => { console.log('get file error!!'); return false; }
        // );

    }

    public InitSystemLang(): void {
        var chosenLang: Languages;

        var hasSavedLang:string = LocalStorage.GetString(ShaerdStrings.keys_lang_current);
        if (hasSavedLang != null) {
            chosenLang = (<any>Languages)[hasSavedLang];
        }
        else {
            chosenLang = this.MapBrowserLangToLanguages();
        }

        this.SetSystemLanguage(chosenLang);
        return;
    }

    private MapBrowserLangToLanguages(): Languages {
        var sys_lang = navigator.language
            ? navigator.language[0]
            : (navigator.language);

        sys_lang = sys_lang.toLowerCase();

        if (sys_lang.indexOf('he') !== -1) {
            return Languages.he;
        }

        return Languages.en;

    }

    private static SystemLang: Languages;

    private static CurrentLangValues: string = "";

    private static DefultValues(): string {
        var values = {
            // ******* Key of misc screen:
            "helloWorld": "Hello World!!",
            "invaild_login": "The user name or password is incorrect",
            "server_error": "Cannot reach server, please make sure internet connection",
            "username_exist": "Username allready exist in system",
            "under_min_items": "Select at least one item",
            "date": "Date",
            "chat": "Chat",
            "chat_now": "chat now",
            "sales": " sales",
            "Sales": " Sales",
            "specialities": "Specialities",
            "price": "Price",
            "from": "from",
            "at": "at",
            "select":"Select",

            // ******* Key of Opening screen:
            "line1": "It's fun",
            "line2": "to shop with someone", 

            // ******* Key of Signin screen:
            "signin_title": "Hi! Would you like to Login?",
            "username": "User Name",
            "enter_username": "Enter Your email address",
            "enter_password": "Enter Your password",
            "password": "Password",
            "forgot_password": "Forgot Password?",
            "signin_login_btn": "Let's Log In",
            "signin_new_user_btn": "Hi! i'm new",
            "signin_footer_txt": "Log In easily with social",
            "login_later":"Log In Later",
            // ******* Key of Chat_speciality screen:
            "type_msg": "Type your message",

            // ******* Key of Deal screen:
            "deal_title": "Deal with it",
            "deal_subtitle": "a specific deal you made through our specialist",
            "deal_from": "Brought to you by",
            "to_blog": "To Blog",
            "deal_prev_btn": "Previous Deal",
            "deal_next_btn": "Next Deal",
            "deal_share_btn": "Share this",

            // ******* Key of Found_product screen:
            "found_product_title": "Product Search result",
            "found_product_sub_title": "Shopping makes me happy",
            "sort_by_rate": "Sort By Rate",
            "sort_by_sales": "Sort By Sales",
            "sort_by_price": "Sort By Price",

            // ******* Key of Found_specialist screen:
            "found_specialist_title": "Specialist Search result",
            "found_specialist_subtitle": "Shopping is coming",
            "sort_by_seniority": "Sort By Seniority",

            // ******* Key of Hi_info screen:
            "hi_info_title": "Hi Info",
            "specialist_in": "Specialist in",
            "show_more": "show more",
            "show_less": "show less",
            "left_tab_title": "Personal Info",
            "right_tab_title": "Specialist Info",
            "hi_chats": "Hi Chats",
            "buyer_links": "BUYER links",
            "my_wishes": "My Wishes",
            "my_buys":"My Buys",
            "sys_note": "System Notification",
            "new": "new",
            "my_sells": "My Sells",
            "specialist_links": "My Links",
            "blog_options": "Blog Options",
            "help_title": "How can we help you",
            "faq_btn": "FAQ",
            "customer_service_btn": "Customer Service",
            "about_btn": "About Hi Lets Buy",
            "terms_btn": "Terms Of Use",
            "contact_btn": "Contact Us",
            "setting_title": "Settings - Wanna update",
            "personal_info_btn_maintxt": "Personal Info",
            "personal_info_btn_secdtxt": "Nickanme, Mail, State, Language",
            "specialist_info_btn_maintxt": "Specialist Info",
            "specialist_info_btn_secdtxt": "Specialist Categories",
            "accountAndBilling_btn_maintxt": "Billing",
            "accountAndBilling_btn_secdtxt": "Credit Info",
            "alertsAndNotifications_btn_maintxt": "Alerts & Notifications",
            "alertsAndNotifications_btn_secdtxt": "Choose your notification setting",
            "log_out_btn_maintxt": "Log Out",
            "log_out_btn_secdtxt": "Press here to LogOut",

            // ******* Key of Major screen:
            "major_title": "Let’s Have Fun",
            "major_subtitle": "Get ready to rumble",
            "find_specialist_btn_maintxt": "Find a Specialist",
            "find_specialist_btn_secdtxt": "& Buy someting",
            "find_specialist_main_btn_maintxt": "to Chat & Buy",
            "find_product_btn_maintxt": "Find a product",
            "find_product_btn_secdtxt": "form our specialists lists",
            "whosup_btn_maintxt": "Who's Up",
            "whosup_btn_secdtxt": "Best rated specialists",
            "best_blogs_btn_maintxt": "Best Blogs",
            "best_blogs_btn_secdtxt": "Explore & Enjoy",
            "links_btn_maintxt": "My Links",
            "links_btn_secdtxt": "Watch & Managey",
            "blogs_btn_maintxt": "My Blog",
            "blogs_btn_secdtxt": "Watch & Managey",

            // ******* Key of My_buys screen:
            "my_buys_title": "Hi! let's see My BUYs",
            "my_buys_subtitle": "The items you bought thanks to our specialists",
            "search_item": "Looking for a specific BUY",
            "sort_by_date": "Sort By Date",

            // ******* Key of My_chats screen:
            "my_chats_title": "MY CHATS",
            "search_chat": "Search Conversation",
            "all_chats": "All Chats",
            "specialist_chats": "Specialist Chats",
            "favorites": "Favorites",
            "user_chats": "User Chats",
            "new_chat_line1": "New",
            "new_chat_line2": "Chat",

            // ******* Key of My_sells screen:
            "my_sells_title": "My sells",
            "money_earned": "Money earned",
            "total": "Total",
            "month": "Last 30 days",
            "prev_month": "Previous Month",
            "most": "Most",
            "profitable": "profitable",
            "sellable": "sellable",
            "product": "product",
            "sales_info": "Sales Info",
            "sent2u": "were sent to your account",
            "to_link": "To link",
            "buyer": "Buyer",
            "profit_per_unit": "Profit Per Unit",
            
            // ******* Key of Search_product screen:
            "search_product_title": "Product Search",
            "search_product_subtitle": "Shop 'tiil you drop",
            "input_product": "What do you want to buy",
            "catagory": "Catagory",
            "input_catagory": "Select Category",
            "more_search_options": "More Search Options",
            "less_search_options": "Less Search Options",
            "history_btn": "To My Search history",
            "find_btn": "Find me a product",
            "select_all": "Select All",

            // ******* Key of Search_specialist screen:
            "search_specialist_title": "Let's Find a Specialist",
            "search_specialist_subtitle": "Feels like shopping",
            "catagory2buy": "Select Category",
            "online": "Only Online Specialists",
            "change": "Change Languauge \ Location",
            "change_lang": "Choose Specialist Language",
            "change_loc": "Choose Specialist State",
            "find_spec": "Find My Specialist",

            // ******* Key of Blog_post screen:
            "blog_post_title": "Post Name",
            "go_to_link": "Go To Link",

            // ******* Key of Signup screen:
            "signup_title": "Signup",
            "step": "Step",
            "Invalid_email": "Invalid email address",
            "short_password": "Password must contain at least 6 characters",
            "password_not_match": "Passwords don't match",
            "mailValidationError": "Invalid code",
            "subtitle_step0": "It’s allways nice to meet someone new",
            "subtitle_step1": "It's allways nice to meet someone new",
            "password_again": "Your password again, please",
            "step1_next": "To the next step",
            "subtitle_step3": "It's allways nice to meet someone new",
            "required_field": "*Required",
            "young_age": "User age is too young",
            "name_lable": "What’s your name",
            "fname": "First Name Here",
            "lname": "Last Name Here",
            "more_lable": "Tell us more about yourself",
            "email": "Your e-mail",
            "birthday": "Your birthday dd/MM/yyyy",
            "location": "Choose Your State",
            "state": "Choose Your State",
            "step2_next": "Carry on",
            "subtitle_step4": "It's allways nice to meet someone new",
            "language": "What Language Do You Speak?",
            "step4_next": "To the last step",
            "subtitle_step5": "One small technical detail",
            "otu": "Please read our Terms Of Use. We have to ask",
            "agree": "I agree",
            "step5_next": "Let’s Finish signing In",
            "subtitle_step6": "You’re Done",
            "welcome": "welcome! welcome! welcome!",
            "congrats": "Congrats",
            "partof_line1":"You are now a part of",
            "partof_line2": "Hi! Lets Buy community",
            "btn1": "Update your Info",
            "btn2": "Update your MyHi",
            "btn3": "Buy Something",
            "btn4": "Chat with a specialist",

            // ******* Key of Contact_us screen:
            "contact_us_title": "Contact Us",
            "contact_us_subtitle": "What’s on your mind",
            "static_txt_line1": "We are here for you",
            "static_txt_line2": "Before asking us a question",
            "static_txt_line3": "Plase check those following pages for an answear",
            "static_txt_line4": "Not satisfied",
            "static_txt_line5": "Write to us, and we will do our best",
            "write_message": "write your message here",
            "aboutUs_btn": "About Us",
            "send_btn": "Send",

            // ******* Key of FAQ screen:
            "faq_title": "FAQ",
            "faq_subtitle": "Hi Lets Answer",
            "tab1": "General",
            "tab2": "User",
            "tab3": "Specialist",
            "footer_txt": "Did not find your Answer? Don't worry",
            "footer_btn": "Contact Us",

            // ******* Key of My_links screen:
            "my_links_title": "Links",
            "my_links_subtitle": "Save it 2 Sell it",
            "add_link": "Add Your Link Here",
            "add_link_btn": "Add Link",
            "search_link": "Search link",
            "folder_tab": "Folder",
            "category_tab": "Category",

           // ******* Key of New_blog screen:
            "replace": "Replace",
            "replace_link": "Replace Link",
            "post_subtitle": "Post SubTitle",
            "your_post_text": "your post text",

            // ******* Key of About_us screen:
            "about_title": "About Us",
            "about_subtitle": "Get To Know Us Better",
            "sites": "Sites we work with",
            "tou": "Our TOU",
            "contact":"Contact Us",
            
            // ******* Key of RenewTOU screen:
            "tou_title": "Wait a minute",
            "tou_subtitle": "It won’t take long",
            "second_title": "We have new TERMS OF USE",
            "continue":"Continue",
            "command": "In order to improve your experience, we have new Terms Of Use.Please read and confirm",

             // ******* Key of Reviews screen:
            "reviews_title": "Reviews",
            "reviews_subtitle": "What People Are Saying",
            "write_review":"Write a Review",
            "load_more": "Load More",
            "your_review":"write your review here",
            "post_review":"Post Review",

            // ******* Key of Sites screen:
            "sites_title": "a SITE for sore eyes",
            "sites_subtitle": "The Sites We Work With",
            "lookfor_site": "Looking for a specific SITE",
            "sort_ab": "Sort Alphabetically",
            "sort_category": "Sort By Category",
            "go2site": "To Site",

            // ******* Key of Left Menu screen:
            "left_menu_title": "Menu",
            "left_menu_btn1": "Home",
            "left_menu_btn2": "My Chats",
            "left_menu_btn3": "My Blog",
            "left_menu_btn4": "Find Specialist",
            "left_menu_btn5": "Find Product",
            "left_menu_btn6": "My Info",
            "left_menu_btn7": "My Links",

            // ******* Key of Right Menu screen:
            "right_menu_title": "Options",
            "right_menu_btn1": "Edit Post",
            "right_menu_btn2": "Delete Post",
            "right_menu_btn3": "Pin Post",

            // ******* Key of My_hi screen:
            "sales_info_line1": "Sales so far",
            "sales_info_line2": "Sales this month",
            "sales_info_line3_part1": "last sale: ",
            "sales_info_line3_part2": "days ago",
            "sales_info_line1_default": "Wanna start selling?",
            "sales_info_line2_default": "Fill in your spec details",
            "sales_info_line3_default": "Right Here",
            "more_spec": "more specialities",
            "languages": "Language",
            "edit": "Edit",
            "specialities_line1_default": "Insert Specialities & let people know",
            "specialities_line2_default": "what products you can recomend on!",
            "blog_title": "Blog Title",
            "add_blog_default_line1": "Add Posts with Link to your Blogs",
            "add_blog_default_line2": "That people would buy through your Links",
            "add_blog_default_btn": "Add Blog Post",
            "buy_now": "Buy Now",
            "full_post":"Full Post",
            // ******* Key of EditPersonalInfo screen:
            "f_name": "First Name",
            "l_name": "Last Name",
            "birth_day": "Birthday",
            "save": "Save",
            "cancel":"Cancel",
            "remove": "Remove",
            "add_lang": "Add Another Language",
            "state_": "State",
            "reset_pass":"Reset Password",

            // ******* Key of EditSpecialistCategories screen:
            "EditSpecialistCategories_title": "Choose Your Specialities: Categories",
            "update_btn": "Update Categories",

            // ******* Key of EditLanguagesList screen:
            "EditLanguagesList_title":"Choose Your Languages",
            "EditLanguagesList_btn": "Update Languages",

            // ******* Key of EditAccountInfo screen:
            "credit_card": "Credit Card",
            "credit_type": "Credit Type",
            "exp": "Exp.",
            
            // ******* Key of Wishlist screen:
            "wishlist_title": "Wishfull thinking",
            "wishlist_subtitle": "Your Wishlist is Our Command",
            "wishlist_search_item": "Looking for a specific WISH",
            
        };

        return JSON.stringify(values);
    }

    private static ExtractValueFromString(list: string, key: string) {
        try {
            if (list != null) {
                var dic = JSON.parse(list);
                if (dic != null) {
                    var value = dic[key];
                    if (value != null) {
                        return value;
                    }
                }
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    public static GetValue(key: string): string {
        var fromLang = LanguageService.ExtractValueFromString(LanguageService.CurrentLangValues, key);
        if (fromLang != null) {
            return fromLang;
        }
        var fromDefult = LanguageService.ExtractValueFromString(LanguageService.DefultValues(), key);
        if (fromDefult != null) {
            return fromDefult;
        }

        return 'Value Not Exist!!!';
    }

}


export enum Languages {
    en,
    he
}