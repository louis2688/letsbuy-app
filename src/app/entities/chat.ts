import * as SendBird from "sendbird";


export class Chat_VM implements SendBird.UserMessage, SendBird.FileMessage {

    constructor() {
        this.sender = new ChatUser_VM();
    }
    url: string;
    name: string;
    size: number;
    type: string;
    thumbnails: SendBird.ThumbnailObject[];
    message: string;    
    sender: SendBird.Sender;
    reqId: string;
    translations: Object;
    channelUrl: string;
    channelType: string;
    messageId: number;
    messageType: string;
    data: string;
    customType: string;
    metaArray: Object;
    mentionType: string;
    mentionedUsers: SendBird.User[];
    createdAt: number;
    updatedAt: number;
    isEqual(target: SendBird.BaseMessageInstance): boolean {
        throw new Error("Method not implemented.");
    }
    isIdentical(target: SendBird.BaseMessageInstance): boolean {
        throw new Error("Method not implemented.");
    }
    isOpenChannel(): boolean {
        throw new Error("Method not implemented.");
    }
    isGroupChannel(): boolean {
        throw new Error("Method not implemented.");
    }
    isUserMessage(): boolean {
        throw new Error("Method not implemented.");
    }
    isFileMessage(): boolean {
        throw new Error("Method not implemented.");
    }
    isAdminMessage(): boolean {
        throw new Error("Method not implemented.");
    }
    serialize(): Object {
        throw new Error("Method not implemented.");
    }
    getMetaArrayByKeys(keys: string[]): Object {
        throw new Error("Method not implemented.");
    }



}

export class ChatUser_VM implements SendBird.User{
    userId: string="";
    nickname: string="";
    profileUrl: string = "";
    metaData: Object = new Object();
    connectionStatus: string="";
    lastSeenAt: string="";
    isActive: boolean = false;
    friendDiscoveryKey: string | null="";
    friendName: string | null="";
    isBlockedByMe: boolean;
    getOriginalProfileUrl(): string {
        throw new Error("Method not implemented.");
    }
    createMetaData(metaDataMap: Object, callback: SendBird.commonCallback): void {
        throw new Error("Method not implemented.");
    }
    updateMetaData(metaDataMap: Object, callback: SendBird.commonCallback): void;
    updateMetaData(metaDataMap: Object, upsert: boolean, callback: SendBird.commonCallback): void;
    updateMetaData(metaDataMap: any, upsert: any, callback?: any) {
        throw new Error("Method not implemented.");
    }
    deleteMetaData(metaDataKey: string, callback: SendBird.commonCallback): void {
        throw new Error("Method not implemented.");
    }
    deleteAllMetaData(callback: SendBird.commonCallback): void {
        throw new Error("Method not implemented.");
    }
    serialize(): Object {
        throw new Error("Method not implemented.");
    }

}

export class UserSBToken {
    uid: string="";
    token: string="";
}