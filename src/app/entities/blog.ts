import { User } from "./user";
import { FolderItem } from "./index";

export class Blog {
    public id: string="";
    public coverImg: string="";
    public linkPostList: LinkPost[]=[];
    public PostList: Post[]=[];
    public blogTitle: string="Blog Title";
    public blogDesc: string = "";
    public user: User = new User();
    public canEdit: boolean = false;
}

export class Post {
    public id: string="";
    public image: string="";
    public category: string;
    public date: Date;
}

export class FullPost extends Post {
    public title: string = "";
    public date: Date = new Date();
    public mainText: string="";
    public linkIDs: string[]=[];
    public links: FolderItem[]=[];
    public isOwner: boolean = false;
    public specID: string="";
}

//export class Specialist {
//    public id: string="";
//    public name: string="";
//    public rate: number;
//    public picture: string="";
//    public isFollow: boolean;
    
//    constructor(
//        _id: string,
//        _name: string,
//        _rate: number,
//        _picture: string,
//        _isFollow: boolean
//    )
//    {
//        this.id = _id;
//        this.name = _name;
//        this.rate = _rate;
//        this.picture = _picture;
//        this.isFollow = _isFollow;
//    }
//}

export class LinkPost {
    public linkid: string="";
    public postid: string="";
    public itemImg: string="";
    public itemDescription: string="";
    public site: string="";
    public linkUrl: string="";
    public isInWish: boolean = false;
    public coinIcon: string="";
    public isPin: boolean=false;
    public isTouched: boolean = false;
   
   
}