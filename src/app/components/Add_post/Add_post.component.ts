import { Component, ViewChild, Output, EventEmitter, ElementRef} from '@angular/core';
import { ToastComponent } from "../Toast/Toast.component";
import { FullPost } from "../../entities/blog";
import { LinksService, BlogService, LocalStorage, ShaerdStrings } from "../../serivces";
import { FolderItem } from "../../entities/link";
import { Router, ActivatedRoute } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';

@Component({
    selector: 'Add_post',
    templateUrl: './Add_post.component.html',
    styleUrls: ['./Add_post.component.css'],
    providers: [LinksService, BlogService]
})
export class Add_postComponent {
    public new_post: FullPost = new FullPost();
    public is_My_links_open: boolean = false;
    public isEdit: boolean = false;
    public mobilemode: boolean = false;
    public directAdd: boolean = false;
    inSave: boolean = false;
    @ViewChild('imageUpload') fileInput!: ElementRef;
    @Output() SavedChanges = new EventEmitter();
    @Output() Finish = new EventEmitter();
    @Output() Cancel = new EventEmitter();

    @ViewChild(ToastComponent) toast!: ToastComponent;

    constructor(private linkService: LinksService, private blogService : BlogService, private nav: Router, aRouter: ActivatedRoute) {
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";

        var id = aRouter.snapshot.params['id'];
        if(id){
            this.selectedLink(id);
            this.directAdd = true;
        }
    }

    CloseMyLinks() {
        this.is_My_links_open = false;
    }

    selectedLink(linkId: string) {
        var item: FolderItem;
        this.linkService.Get(linkId).then(
            res => {
                if (res.isOk) {
                    item = res.Singel;
                    this.CloseMyLinks();
                    this.new_post.links.push(item);
                    if (!this.new_post.image || this.new_post.image.toString().length == 0) {
                        this.new_post.image = item.picture;
                    }
                }
            });        
    }

    AddLink() {
        this.is_My_links_open = true;
    }
    RemoveLink(item: FolderItem) {
        var index = this.new_post.links.indexOf(item);
        this.new_post.links.splice(index, 1);
    }

    async Save() {
        if (this.inSave) {
            return;
        }
        if (!this.new_post.image || this.new_post.image.toString().length == 0) {
            this.toast.ToggleToast("Plase add image or link with image");
            return;
        }
        this.Finish.emit();
        this.inSave = true;
        var postRes = await this.blogService.CreatePost(this.new_post);
        if (postRes.isOk) {
            this.new_post.id = postRes.Singel.toString();

            const fileBrowser = this.fileInput.nativeElement;
            if (fileBrowser.files && fileBrowser.files[0]) {
                var formData = new FormData();
                formData.append('files', fileBrowser.files[0]);
                await this.blogService.UpdatePostImage(formData, this.new_post);
            }

            if(this.directAdd){
                this.nav.navigate(['/My_hi']);
            }
            else{
                this.SavedChanges.emit();
            }
        }
        else {
            postRes.Errors.forEach((obj) => {
                console.log(obj);
            })
        }
    }

    CancelEdit() {
        
        if(this.directAdd){
            this.nav.navigate(['/My_links']);
        }
        else{
            this.Cancel.emit();
            this.SavedChanges.emit();
        }


    }

     public SelectImageDialog() {
         this.fileInput.nativeElement.click();
    }

     public async SelectImage() {
         const fileBrowser = this.fileInput.nativeElement;
         if (fileBrowser.files && fileBrowser.files[0]) {
             this.new_post.image = URL.createObjectURL(fileBrowser.files[0]);
         }
    }

    public GetDynamicLinkData(data: string): string {

        var url = encodeURI(data);

        var hybridUrl = 'hybrid:openlink?url=' + url;

        return hybridUrl;
    }
}
