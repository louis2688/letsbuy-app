import { Component, Input } from '@angular/core';


@Component({
    selector: 'loadingBar',
    templateUrl: './LoadingBar.component.html',
    styleUrls: ['./LoadingBar.component.css'],
})
export class LoadingBarComponent {
    @Input() _size: string = "";

    setSize(): string {
        return 'loader ' + this._size;
    }
}

