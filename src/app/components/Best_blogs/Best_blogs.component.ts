import { Component } from '@angular/core';
import { BlogService } from '../../serivces/index';
import { Blog } from '../../entities/index';

@Component({
    selector: 'Best_blogs',
    templateUrl: './Best_blogs.component.html',
    styleUrls: ['./Best_blogs.component.css'],
    providers: [BlogService]
})
export class Best_blogsComponent {

    public items: Blog[] = [];

    constructor(private blogService: BlogService) {
        this.blogService.BestBlogs().then(x => {
            if (x.isOk) {
                this.items = x.List;
            }
        })
    }
    
}
