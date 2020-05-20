import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Question } from "../entities/faq";
import { Chat, userReview } from "../entities/user";
import { Site } from "../entities/site";
import { Product } from "../entities/product";
import { Folder } from "../entities/link";
import { ShaerdStrings } from './ShaerdStrings';
import { LinkPost } from '../entities/blog';
import { ProductQueryResult } from '../entities/search';

export class InputValidation {

    public static Email(input: string): boolean {
        var patrren = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return patrren.test(input);
    }

    public static Match(input: string, confirm: string): boolean {
        return input === confirm;
    }
}


@Pipe({
    name: 'clipSafe'
})
@Injectable()
export class clipSafeFilter implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) { }
    transform(rate: number, index: number) {
        if (rate >= index) {
            return this._sanitizer.bypassSecurityTrustStyle('rect(0,20px, 20px, 0)');
        }
        else if (rate + 1 > index) {
            var partialPart = (rate+1) - index;
            var precent = partialPart * 20;
            var result = 'rect(0,' + precent + 'px, 20px, 0)';
            return this._sanitizer.bypassSecurityTrustStyle(result);;
        }
        else{
            return this._sanitizer.bypassSecurityTrustStyle('rect(0,0px, 20px, 0)');
        }
        
    }
}

@Pipe({
    name: 'ShortPinnedItems'
})
@Injectable()
export class ShortPinnedItems implements PipeTransform {
    transform(items: LinkPost[]) {
        return items.sort((x, y) => {
            var result = ((x.isPin === y.isPin) ? 0 : x.isPin ? -1 : 1);
            console.log(result);
            return result;
        });
    }
}

@Pipe({
    name: 'maxWidth'
})
@Injectable()
export class maxWidthFilter implements PipeTransform {
    transform(values: string[], cahrs : number) {
        if (values != null && values.length > 0) {
            var str = values.join(', ');
            return str.substr(0, cahrs);
        }

        return '';
    }
}


@Pipe({
    name: 'promiseImageSrc'
})
@Injectable()
export class EmptyImageFilter implements PipeTransform {
    transform(value: string) {
        if (value != null && value.length > 0) {
            return value;
        }

        return ShaerdStrings.defultImagePerson;
    }
}


@Pipe({
    name: 'image64Secure'
})
@Injectable()
export class image64SecureFilter implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) { }
    transform(data: string): any {
        return this._sanitizer.bypassSecurityTrustUrl(data);
    }
}

@Pipe({
    name: 'image64SecureToStyle'
})
@Injectable()
export class image64SecureFilterToStyle implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) { }
    transform(data: string): any {
        return this._sanitizer.bypassSecurityTrustStyle(data);
    }
}


@Pipe({
    name: 'productFilter'
})
@Injectable()
export class ProductFilter implements PipeTransform {
    transform(items: ProductQueryResult[], filter: string): any {
        if (!filter  || filter.length == 0) {
            return items;
        }
        filter = filter.toLowerCase();
        items = items.filter(x => x.siteName.toLowerCase().indexOf(filter) >= 0 || x.productDesc.toLowerCase().indexOf(filter) >= 0 || x.specName.toLowerCase().indexOf(filter) >= 0);
        return items;
    }
}


@Pipe({
    name: 'QuestionFilter'
})
@Injectable()
export class QuestionFilter implements PipeTransform {
    transform(items: Question[], filter: string): any {
        if (!filter || filter.length == 0) {
            return items;
        }
        filter = filter.toLowerCase();
        items = items.filter(x => x.classification.toLowerCase() == filter);
        return items;
    }
}

@Pipe({
    name: 'ChatFilter'
})
@Injectable()
export class ChatFilter implements PipeTransform {
    transform(items: Chat[], tabChecked: string, filter: string): any {
        switch (tabChecked) {
            case "user":
                items = items.filter(x => !x.isSpecialist);
                break;
            case "specialist":
                items = items.filter(x => x.isSpecialist);
                break;
            case "favorite":
                items = items.filter(x => x.isFavor);
                break;
            default:
                break;
        }

        if (!filter || filter.length == 0) { 
            return items;
        }
        filter = filter.toLowerCase();
        items = items.filter(x => x.name.toLowerCase().indexOf(filter) >= 0);
        return items;
    }
}

@Pipe({
    name: 'SiteFilter'
})
@Injectable()
export class SiteFilter implements PipeTransform {
    transform(items: Site[], filter: string): any {
        if (!filter || filter.length == 0) {
             return items;
        }
        filter = filter.toLowerCase();
        items = items.filter(x => (x.name && x.name.toLowerCase().indexOf(filter) >= 0) || (x.description && x.description.toLowerCase().indexOf(filter) >= 0));
        items.sort((a, b) => {
            if (a.isFavor) {
                return 0;
            }
           
            return 1;
        });
        return items;
    }
}


@Pipe({
    name: 'ReviewFilter'
})
@Injectable()
export class ReviewFilter implements PipeTransform {
    
    transform(items: userReview[], loadMore: boolean): any {
     
        if (!loadMore && items.length > 3) {
            var x = items.slice(0, 3);
            return x;
        }
        return items;
    }
}
 
@Pipe({
    name: 'BuysFilter'
})
@Injectable()
export class BuysFilter implements PipeTransform {
    transform(items: Product[], filter: string): any {
        items = items.sort(function (a, b) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        })
          
        if (!filter || filter.length == 0) {
            return items;
        }
        filter = filter.toLowerCase();
        items = items.filter(x => x.description.toLowerCase().indexOf(filter) >= 0);
        return items;
    }
}

@Pipe({
    name: 'FolderLinksFilter'
})
@Injectable()
export class FolderLinksFilter implements PipeTransform {
    transform(items: Folder[], filter: string): any {
        if (!filter || filter.length == 0) {
            return items;
        }
        filter = filter.toLowerCase();
        items = items.filter(x => x.name.toLowerCase().indexOf(filter) >= 0);
        return items;
    }
}

@Pipe({
    name: 'DefaultImageProfilFilter'
})
@Injectable()
export class DefaultImageProfilFilter implements PipeTransform {
    transform(img:string): any {
        if (!img || img == "" || img == null) {
            return "../../../assets/images/User_NoPhoto.png";
        }
        return img;
    }
}

@Pipe({
    name: 'DefaultCoverImageFilter'
})
@Injectable()
export class DefaultCoverImageFilter implements PipeTransform {
    transform(img: string): any {
        if (!img || img == "" || img == null) {
            return "./default_bg.png";
        }
        return img;
    }
}

@Pipe({
    name: 'DefaultImageLinkFilter'
})
@Injectable()
export class DefaultImageLinkFilter implements PipeTransform {
    transform(img: string): any {
        if (!img || img == "" || img == null) {
            return "../../../assets/images/prezent_with_arrow.png";
        }
        return img;
    }
}

@Pipe({
    name: 'DefaultImagePostFilter'
})
@Injectable()
export class DefaultImagePostFilter implements PipeTransform {
    transform(img: string): any {
        if (!img || img == "" || img == null) {
            return "../../../assets/images/prezent_with_arrow.png";
        } 
        return img;
    }
}

@Pipe({
    name: 'ReverseListPipe'
})
@Injectable()
export class ReverseListPipe implements PipeTransform {
    transform(arr: any[]): any {
        return arr.reverse();
    }
}


function groupBy(list: any[], foo: (item: any) => any): any[]
{
    var result: any[]=[];
    var cat: any[] = [];

    for (var i = 0; i < list.length; i++) {
        var param = foo(list[i]);
        if (cat.indexOf(param) == -1) {
            cat.push(param);
        }
    }

    for (var i = 0; i < cat.length; i++) {
        var item: any[]=[];
        item.push(cat[i]); // the first item is the key
        for (var j = 0; j < list.length; j++) {
            if (foo(list[j]) == cat[i]) {
                item.push(list[j]);
            }
        }
        result.push(item);
    }
    return result;
}

@Pipe({
    name: 'HybridLink'
})
@Injectable()
export class HybridLinkPipe implements PipeTransform {
    constructor(private san: DomSanitizer){}
    transform(url: string): any {
        var url = encodeURI(url);
        var hybridUrl = 'hybrid:openlink?url=' + url;
        return this.san.bypassSecurityTrustUrl(hybridUrl);
    }
}