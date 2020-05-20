import { Component, Input, ViewChild, ElementRef } from '@angular/core';


@Component({
    selector: 'Image_Foucs',
    templateUrl: './Image_Foucs.component.html',
    styleUrls: ['./Image_Foucs.component.css']
})
export class Image_FoucsComponent {
    _image: string = "https://bit.ly/29OsQ4k";
    _isShow: boolean = false;
    public curruntRotate: number = 0;
    public zoom: boolean = false;
    @ViewChild('displayImage') private displayImage!: ElementRef;
    constructor()
    {

    }
    OpenImage(img: string) {
        this._image = img;
        this._isShow = true;
    }

    RotateImage(deg: number) {
        this.curruntRotate = (this.curruntRotate + deg) % 360; 
        var str = "rotate(" + this.curruntRotate + "deg);";
        this.displayImage.nativeElement.style = str;
    }
    ToggleZoom() {
        this.zoom = !this.zoom;
    }
    exit() {
        this._isShow = false;
    }
}

