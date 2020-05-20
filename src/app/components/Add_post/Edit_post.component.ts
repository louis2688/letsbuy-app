import { Component, ViewChild, Output, EventEmitter, ElementRef, Input, AfterContentInit} from '@angular/core';
import { ToastComponent } from "../Toast/Toast.component";
import { FullPost } from "../../entities/blog";
import { LinksService } from "../../serivces/LinksManager";
import { FolderItem } from "../../entities/link";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "../../serivces/BlogService";
import { LocalStorage } from '../../serivces/LocalStorage';
import { ShaerdStrings } from '../../serivces';

@Component({
    selector: 'Edit_post',
    templateUrl: './Add_post.component.html',
    styleUrls: ['./Add_post.component.css'],
    providers: [LinksService, BlogService]
})
export class Edit_postComponent implements AfterContentInit {
   
    public new_post: FullPost = new FullPost();
    public is_My_links_open: boolean = false;
    public isEdit: boolean = true;
    public mobilemode: boolean = false;
    public directAdd: boolean = false;
    public sharelink : string ;
    @ViewChild('imageUpload') fileInput!: ElementRef;
    @Output() SavedChanges = new EventEmitter();
    @Output() Finish = new EventEmitter();
    @Output() Cancel = new EventEmitter();
    @Input() postid: string = "";
    @ViewChild(ToastComponent) toast!: ToastComponent;


    constructor(private linkService: LinksService, router: ActivatedRoute,private blogService: BlogService) {
        this.mobilemode = LocalStorage.GetString(ShaerdStrings.keys_platform) != "";

    }

    ngAfterContentInit(): void {
        this.blogService.GetPost(this.postid).then(x => {
            if (x.isOk) {
                this.new_post = x.Singel;
                this.sharelink = "https://hiletsbuy.com/Blog_post/" + x.Singel.id;
            }
        });
    }
    CopyShareLink(){
        this.copyToClipboard(this.sharelink);
        this.toast.ToggleToast("Link Copyed!!");
    }

    /* To copy any Text */
    copyToClipboard(string) {
        let textarea;
        let result;
      
        try {
          textarea = document.createElement('textarea');
          textarea.setAttribute('readonly', true);
          textarea.setAttribute('contenteditable', true);
          textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
          textarea.value = string;
      
          document.body.appendChild(textarea);
      
          textarea.focus();
          textarea.select();
      
          const range = document.createRange();
          range.selectNodeContents(textarea);
      
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      
          textarea.setSelectionRange(0, textarea.value.length);
          result = document.execCommand('copy');
        } catch (err) {
          console.error(err);
          result = null;
        } finally {
          document.body.removeChild(textarea);
        }
      
        // manual copy fallback using prompt
        if (!result) {
          const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
          const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
          result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
          if (!result) {
            return false;
          }
        }
        return true;
      }

    selectedLink(linkId: string) {
        var item: FolderItem;
        this.linkService.Get(linkId).then(
            res => {
                item = res.Singel;
                this.is_My_links_open = false;
                this.new_post.links.push(item);
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

        if (!this.new_post.image || this.new_post.image.toString().length == 0) {
            this.toast.ToggleToast("Plase add image or link with image");
            return;
        }
        this.Finish.emit();
        var postRes = await this.blogService.UpdatePost(this.new_post);
        if (postRes.isOk) {
            this.new_post.id = this.postid;
            const fileBrowser = this.fileInput.nativeElement;
            if (fileBrowser.files && fileBrowser.files[0]) {
                var formData = new FormData();
                formData.append('files', fileBrowser.files[0]);
                await this.blogService.UpdatePostImage(formData, this.new_post);
            }
            this.SavedChanges.emit();
        }
        else {
            postRes.Errors.forEach((obj) => {
                console.log(obj);
            })
        }
    }

    CancelEdit() {
        //TODO delete post
        this.Finish.emit();
        this.SavedChanges.emit();
    }

    async Delete() {
        await this.blogService.DeletePost(this.postid);
        this.Finish.emit();
        this.SavedChanges.emit();
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
