import { Component, Input } from '@angular/core';


@Component({
    selector: 'Logo',
    templateUrl: './Logo.component.html',
    styleUrls: ['./Logo.component.css']

})
export class LogoComponent  {
    @Input() smallSize: boolean = false;
    @Input() _isShow: boolean = false;
    @Input() _whiteLogo: boolean = false;

}
