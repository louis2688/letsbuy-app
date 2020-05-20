import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'Iframe_win',
    templateUrl: './Iframe.component.html',
    styleUrls: ['./Iframe.component.css']

})
export class IframeComponent  {
    public src: SafeResourceUrl;

    constructor(router: ActivatedRoute, private _sanitizer: DomSanitizer) {
        var id = router.snapshot.params['src'];
        this.src = this.ExtractUrl(id);
    }

    private ExtractUrl(id: string) {
        var url = "https://www.google.co.il/";
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
