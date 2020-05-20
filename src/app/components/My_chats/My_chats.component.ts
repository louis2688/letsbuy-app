import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { LanguageService, UserProfileService, LocalStorage } from '../../serivces/index';
import { Chat } from "../../entities/user";

@Component({
    selector: 'My_chats',
    templateUrl: './My_chats.component.html',
    styleUrls: ['./My_chats.component.css'],
    providers: [UserProfileService]
})
export class My_chatsComponent implements AfterViewInit, OnDestroy {
    public items: Chat[] = [];
    public filter: string = "";
    public tabChecked: string = "all";

    public __my_chats_title: string ="";
    public __search_chat: string ="";
    public __all_chats: string ="";

    public __specialist_chats: string ="";
    public __user_chats: string ="";

    public __new_chat_line1: string ="";
    public __new_chat_line2: string ="";
    public __favorites: string ="";


    public specialist_chats: number = 0;
    public user_chats: number = 0;

    private storageKey = "page_mychats";

    constructor(private userService: UserProfileService) {
        this.InitText();

        try {
            this.items = LocalStorage.GetItem(this.storageKey);
        } catch (e) {

        }

    }

    ngOnDestroy(): void {
        LocalStorage.SetItem(this.storageKey, this.items);
    }

    ngAfterViewInit(): void {

        this.userService.GetUserChatsList()
            .then(x => {
                if (x.isOk) {
                    this.items = x.List;
                    if (x.List && x.List != null) {
                        x.List.forEach((obj) => {
                            if (obj.isSpecialist) {
                                this.specialist_chats++;
                            }
                            else {
                                this.user_chats++;
                            }
                        })

                    }
                }
            });
    }

    ChangeTab(tab: string) {
        this.tabChecked = tab;
    }

    DefultImage(e: any) {
        e.target.src = "../../../assets/images/User_NoPhoto.png";
    }

    InitText() {
        this.__my_chats_title = LanguageService.GetValue("my_chats_title");
        this.__search_chat = LanguageService.GetValue("search_chat");
        this.__all_chats = LanguageService.GetValue("all_chats");
        this.__specialist_chats = LanguageService.GetValue("specialist_chats");
        this.__user_chats = LanguageService.GetValue("user_chats");
        this.__new_chat_line1 = LanguageService.GetValue("new_chat_line1");
        this.__new_chat_line2 = LanguageService.GetValue("new_chat_line2");
        this.__favorites = LanguageService.GetValue("favorites");
    }
}




