import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LanguageService, SendBirdService, LinksService, UserProfileService, LocalStorage, ShaerdStrings } from '../../serivces/index';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from "../../entities/user";
import { FolderItem } from "../../entities/link";
import * as $ from 'jquery';

import { Image_FoucsComponent } from "../Image_Foucs/Image_Foucs.component";

import * as SendBird from "sendbird";
import { Chat_VM } from 'src/app/entities/chat';


@Component({
    selector: 'Chat_Speciality',
    templateUrl: './Chat_Speciality.component.html',
    styleUrls: ['./Chat_Speciality.component.css'],
    providers: [SendBirdService, LinksService, UserProfileService]
})

export class Chat_SpecialityComponent implements AfterViewInit, OnDestroy {

    @ViewChild(Image_FoucsComponent) openImage!: Image_FoucsComponent;

    private intervalID: number = -1;

    public localStorageChatKey: string="";
    public localStorageUserKey: string="";

    public connectionStatus : string= "connecting"

    public chatUserId: string="";
    public currentUser: User;


    @ViewChild('imageProfileFromGallery') fileInputFromGallery!: ElementRef;
    @ViewChild('imageProfileFromCamera') fileInputFromCamera!: ElementRef;
    @ViewChild('scrollContainer') private myScrollContainer!: ElementRef;

    @ViewChild('inputElem') private inputElem!: ElementRef;
    @ViewChild('footerElem') private footerElem!: ElementRef;

    public image2Display: string = "";
    public isDisplayImage: boolean = false;
    private currScrollHeight: number = -1;
    private currScrollFlag: boolean = true;
    public is_My_links_open: boolean = false;
    private mobilemode: boolean = false;

    public msgList: (SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage)[] = [];
    public input: string = "";
    public showPopMsg: boolean = false;

    private _channel!: SendBird.GroupChannel;
    public isTyping: boolean  = false;
    private isTypeingLock: boolean = false;
    

    constructor(
        private location: Location,
        router: ActivatedRoute,
        private sbService: SendBirdService,
        private linkService: LinksService,
        private userService: UserProfileService
    )

    {
        this.chatUserId = router.snapshot.params['userChatId'];
        this.localStorageChatKey = "chat_" + this.chatUserId + "_chat";
        this.localStorageUserKey = "chat_" + this.chatUserId + "_user";


        this.InitText();

        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";

        this.currentUser = new User('', '', '', '', new Date(), [], 0, 0, 0, 0, []);
        this.currentUser.rate = 0;
        
        try {
            var _localUser = LocalStorage.GetItem(this.localStorageUserKey);
            if (_localUser &&_localUser != null) {
                this.currentUser = _localUser;
            }

            var _localchat = LocalStorage.GetItem(this.localStorageChatKey);
            if (_localchat && _localchat != null) {
                this.msgList = _localchat;
            }
           
            
        } catch (e) {

        }
        
    }

    selectedLink(linkId: string) {
        this.AddLinkItem(linkId);
        this.is_My_links_open = false;
    }

    async ngAfterViewInit() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            this.currScrollHeight = this.myScrollContainer.nativeElement.scrollHeight;

            var thisintervalID = setInterval(() => {
                if (this.currScrollHeight != this.myScrollContainer.nativeElement.scrollHeight) {
                    $(".chat-container").animate({ scrollTop: this.myScrollContainer.nativeElement.scrollHeight })
                    this.currScrollHeight = this.myScrollContainer.nativeElement.scrollHeight;
                }
            }, 1000)
        } catch (e) {

        }


        this.userService.GetShortUSerData(this.chatUserId).then(x => {
                if (x.isOk) {
                    this.currentUser = x.Singel;
                }
            }
        );
        this.sbService.OpenChatWithUser(this.chatUserId, async (chanel, error) => {
            if (chanel != null) {
                this._channel = chanel;
                chanel.createMemberListQuery().next((res) => {
                    try {
                        this.currentUser.isAvailable = res.filter(x => x.userId == this.chatUserId)[0].connectionStatus.toString() == "online";

                    } catch (e) {

                    }
                })
                var unix = Math.round(+new Date());
                var q = chanel.createMessageListQuery().prev(unix, 80, false, (mList, error) => {
                    if (error) {
                        this.connectionStatus = "offline";
                        return;
                    }

                    var lastSavedMsg = this.msgList.length > 0 ?
                                            this.msgList[this.msgList.length - 1].createdAt : 0;
                    mList.forEach((obj, index) => {
                        if (obj.createdAt > lastSavedMsg) {
                            this.msgList.push(obj);
                        }
                    })
                    if (this._channel) {
                        this._channel.markAsRead();
                    }

                    this.connectionStatus = "online";
                })
            }

            var cHendler: SendBird.ChannelHandler = await this.sbService.CreateChannelHandler();
            cHendler.onMessageReceived = (_channel, _msg) => {
                if (_channel == this._channel) {
                    this.msgList.push(_msg);
                    this._channel.markAsRead();
                }
            }
            cHendler.onTypingStatusUpdated = (chanel) => {
                this.isTyping = !this.isTyping;
            }
            cHendler.onUserEntered = (chanel) => {
                this.currentUser.isAvailable = true;
            }
            cHendler.onUserExited = (chanel) => {
                this.currentUser.isAvailable = false;
            }
            this.sbService.SaveChannelHandler("1", cHendler);


            $("textarea.input_msg").on('keyup', () => {
                if (!this.isTypeingLock) {
                    if (this._channel) {
                        this._channel.startTyping();
                        setTimeout(() => {
                            if (this._channel) {
                                this._channel.endTyping();
                                this.isTypeingLock = false;
                            }
                        }, 5000);
                    }
                }
            })
        });


    }

    ngOnDestroy(): void {
        LocalStorage.SetItem(this.localStorageChatKey, this.msgList);
        LocalStorage.SetItem(this.localStorageUserKey, this.currentUser);
        clearInterval(this.intervalID);
    }

    DisplayImage(elm: any) {
        var url = elm.target.src;
        this.openImage.OpenImage(url);
    }
    MatchInputHeight() {
        this.inputElem.nativeElement.style.height = "";
        var currHeight = this.inputElem.nativeElement.scrollHeight;
        if (currHeight > 100) {
            currHeight = 100;
        }

        this.inputElem.nativeElement.style.height = currHeight + "px";
        this.footerElem.nativeElement.style.height = (currHeight + 18) + "px";

    }

    Back() {
        this.location.back();
    }

    GetTime(n: number): string {
        var date = new Date(n);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Will display time in 10:30:23 format
        return hours + ':' + minutes.substr(-2);
    }

    IsDayPass(prev: number, next: number): boolean
    {
        var prevDate = new Date(prev);
        var nextDate = new Date(next);

        var interval = nextDate.getDate() - prevDate.getDate();
        if (interval > 0) {
            return true;
        }
        return false;
    }
    GetDate(n: number): string {
        var date = new Date(n);
        return date.toDateString();
    }

    async MakeAutoLink(url: string) {
        var tempMsg: SendBird.UserMessage = new Chat_VM();
        tempMsg.message = "Making link...";
        tempMsg.messageType = "user";
        tempMsg.customType = "waitForUpload";
        tempMsg.createdAt = Math.round(+new Date());
        tempMsg.sender.userId == "";
        this.msgList.push(tempMsg);

        this.linkService.GetLinkMetaData(url).then(
            _link => {
                this.linkService.Create(_link).then(
                    addLink => {
                        if (!this._channel) {
                            return;
                        }
                        if (addLink.isOk) { 
                            _link.id = addLink.Singel;
                            var link = JSON.stringify(_link);
                            this._channel.sendUserMessage(link, "", "link", (msg: SendBird.UserMessage | SendBird.FileMessage, error: any) => {
                                var index = this.msgList.indexOf(tempMsg);
                                if (index > -1) {
                                    this.msgList[index] = msg;
                                }
                            });
                        }
                        else {
                            this._channel.sendUserMessage(url, "", "href", (msg: SendBird.UserMessage | SendBird.FileMessage, error: any) => {
                                var index = this.msgList.indexOf(tempMsg);
                                if (index > -1) {
                                    this.msgList[index] = msg;
                                }
                            });
                        }
                    }
                )
            }
        )

        


    }

    SendMsg() {
        if (this.input != "") {
            
            if (this.input.startsWith("http://") || this.input.startsWith("https://")) {
                this.MakeAutoLink(this.input);
                this.input = "";
                return;
            }

            var tempMsg: SendBird.UserMessage = new Chat_VM();
            tempMsg.message = this.input;
            tempMsg.messageType = "user";
            tempMsg.customType = "waitForUpload";
            tempMsg.createdAt = Math.round(+new Date());
            tempMsg.sender.userId == "";
            this.msgList.push(tempMsg);

            if (!this._channel) {
                return;
            }
            this._channel.sendUserMessage(this.input, (msg: SendBird.UserMessage | SendBird.FileMessage, error: any) => {
                var index = this.msgList.indexOf(tempMsg);
                if (index > -1) {
                    this.msgList[index] = msg;
                }
                //this.msgList.push(msg);
                //tempMsg = msg;
            }) ;
            
            this.input = "";
        }
    }


    AttachItemClick() {
        this.showPopMsg = true;
    }
    AttachItem(action: string) {
        switch (action) {
            case "Link":
                this.is_My_links_open = true;
                this.showPopMsg = false;
                break;
            case "Camera":
                this.fileInputFromCamera.nativeElement.click();
                this.showPopMsg = false;
                break;
            case "Gallery":
                this.fileInputFromGallery.nativeElement.click();
                this.showPopMsg = false;
                break;
            default:
                break;
        }
    }


    AddLinkItem(linkId: string) {
        this.linkService.Get(linkId).then(res => {
            if (res.isOk) {
                var link = JSON.stringify(res.Singel);
                var tempMsg: SendBird.UserMessage = new Chat_VM();
                tempMsg.message = link;
                tempMsg.messageType = "user";
                tempMsg.customType = "waitForUpload.link";
                tempMsg.createdAt = Math.round(+new Date());
                tempMsg.sender.userId == "";
                this.msgList.push(tempMsg);
                if (!this._channel) {
                    return;
                }
                this._channel.sendUserMessage(link,"","link", (msg: SendBird.UserMessage | SendBird.FileMessage, error: any) => {
                    var index = this.msgList.indexOf(tempMsg);
                    if (index > -1) {
                        this.msgList[index] = msg;
                    }
                });
            }
        })

    }

    public GetLinkData(data: string) : FolderItem {
        var json: FolderItem = JSON.parse(data);
        return json;
    }

    public GetDynamicLinkData(data: string): string {

        var asObject = this.GetLinkData(data);

        var url = encodeURI(asObject.linkUrl);

        var hybridUrl = 'hybrid:openlink?url=' + url;

        return hybridUrl;
    }
    
    public SelectImageFromGallery() {
        const fileBrowser = this.fileInputFromGallery.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var file = fileBrowser.files[0];
            var tempMsg: any = new Chat_VM();
            tempMsg.message = this.input;
            tempMsg.messageType = "file";
            tempMsg.customType = "waitForUpload";
            tempMsg.url = window.URL.createObjectURL(fileBrowser.files[0]);
            tempMsg.createdAt = Math.round(+new Date());
            tempMsg.sender.userId == "";
            this.msgList.push(tempMsg);
            this._channel.sendFileMessage(file, '', '', [{ 'maxWidth': 150, 'maxHeight': 150 }], (msg: SendBird.FileMessage | SendBird.UserMessage) => {
                tempMsg = msg;
            })
        }
    }


    public __type_msg: string = "";
    /* Static image */
    DefultImage(e: any) {
        e.target.src = "../../../assets/images/User_NoPhoto.png";
    }


    DefultLinkImage(e: any) {
        e.target.src = "../../../assets/images/prezent_with_arrow.png";
    }

    InitText() {
        this.__type_msg = LanguageService.GetValue("type_msg");
    }

}


