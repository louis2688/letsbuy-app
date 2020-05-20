import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
import { Blog, FullPost, Post } from '../entities/blog';

@Injectable()
export class BlogService {

    constructor(private _http: SecureHttp, private _strings: ShaerdStrings) { }

    public BestBlogs() {
        return this._http._get<Blog>(this._strings.blog_bestBlogs);
    }

    public GetBlog(id: string) {
        var url = this._strings.blog_getBlog + "?id=" + id;
        return this._http._get<Blog>(url);
    }

    TogglePin(id: string) {
        var url = this._strings.blog_togglePin + "?id=" + id;
        return this._http._get<boolean>(url);
    }

    public async UploadCoverImage(data: FormData) {
        var result = await this._http.postFile<string>(this._strings.blog_updateCoverImage, data);
        return result;
    }

    public UpdateBlog(data: Blog) {
        var _data = new Blog();
        _data.id = data.id;
        _data.blogTitle = data.blogTitle;
        _data.blogDesc = data.blogDesc;
        return this._http._put<boolean>(this._strings.blog_updateBlog, _data);
    }

    public async GetPost(id: string) {
        var url = this._strings.blog_GetPost + "?id=" + id;
        var result = await this._http._get<FullPost>(url);
        if (result.isOk) {
            result.Singel.date = new Date(result.Singel.date);
        }

        return result;
    }

    public CreatePost(item: FullPost) {
        return this._http._post<number>(this._strings.blog_newPost, item);
    }

    public UpdatePost(item: FullPost) {
        return this._http._put<boolean>(this._strings.blog_updatePost, item);
    }

    public DeletePost(item: string) {
        var url = this._strings.blog_deletePost + "?id=" + item;
        return this._http._get<boolean>(url);
    }

    public UpdatePostImage(item: FormData, post: FullPost) {
        var url = this._strings.blog_post_uploadImage + "?pid=" + post.id;
        return this._http.postFile<boolean>(url, item);
    }

}

@Pipe({
    name: 'postByCategories'
})
@Injectable()
export class postByCategoriesFilter implements PipeTransform {
    transform(posts: Post[], category: string): Post[] {
        return posts.filter(x=>x.category == category);
        //return items.sort(function(a,b){ return a.date.getTime() - b.date.getTime(); });;
    }
}