import { Injectable } from '@angular/core';
import * as SendBird from "sendbird";
import { UserSBToken } from '../entities/chat';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
import { LocalStorage } from './LocalStorage';
import { AuthenticationService } from './Authentication.Service';
@Injectable()
export class SendBirdService {

    public static APP_ID: string = "";
    private UID: string="";
    private sb!: SendBird.SendBirdInstance;

    constructor(private http: SecureHttp, private str: ShaerdStrings) {}

    private async GetInstance(callback: SendBird.userCallback) {
        try {
            if (this.isBrowser()) {
                var _token = await this.GetUsetToken();
                if (_token.isOk) {
                    this.UID = _token.Singel.uid;
                    var token = _token.Singel.token;
                    this.sb = new SendBird({ 'appId': SendBirdService.APP_ID });
                    this.sb.connect(this.UID, token, callback);
                }
            }
        } catch (e) {
            console.log("Fail get sbt");
        }
    }

    public async Online(){
        this.GetInstance(()=>{});
    }

    public async GetUsetToken() {
        return this.http._get<UserSBToken>(this.str.user_get_sbToken);
    }

    public async RegisterUserNotifications() {
        if (AuthenticationService.isAuthenticated()) {
            var _platform = LocalStorage.GetString(ShaerdStrings.keys_platform);
            if (_platform && (_platform == 'android' || _platform == 'ios')) {
                var url = "hybrid:updatesbuser?token=" + AuthenticationService.Token();
                try {
                    window.location.href = url;
                } catch (e) {

                }
                return;
            }
        }

    }

    public async OpenChatWithUser(chatUserId: string, callback: SendBird.groupChannelCallback) {
        this.GetInstance((user, error) => {
            this.sb.GroupChannel.createChannelWithUserIds([chatUserId], true, chatUserId, "", "", callback);
        });
    }

    public async CreateChannelHandler() {
        return new this.sb.ChannelHandler();
    }

    public async Disconnect() {
        this.sb.disconnect();
    }
    public async SaveChannelHandler(id:string,hendler:SendBird.ChannelHandler) {
        this.sb.addChannelHandler(id, hendler);
    }

    private isBrowser() {
        try {
            if (localStorage != null) {
                return true;
            }
        } catch (e) {

        }
        return false;
    }
}
//ViewModels

