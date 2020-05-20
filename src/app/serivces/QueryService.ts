import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ProductQueryResult, QueryResult,Query } from '../entities/search';
import { SecureHttp } from './SecureHttp';
import { ShaerdStrings } from './ShaerdStrings';
@Injectable()
export class QueryService {
    constructor(private _http: SecureHttp, private _strings: ShaerdStrings) { }

    public AddQuery(query: Query) {
        return this._http._post<number>(this._strings.query_add, query);
    }

    public GetQuery(id: number) {
        return this._http._post<QueryResult>(this._strings.query_get, { "id": id });
    }

    public AddProductQuery(query: Query) {
        return this._http._post<number>(this._strings.query_product_add, query);
    }

    public GetProductQuery(id: number) {
        return this._http._post<ProductQueryResult>(this._strings.query_product_get, { "id": id });
    }

    public GetBestSpec(id: number) {
        return this._http._get<QueryResult>(this._strings.query_best_spec);
    }

}


@Pipe({
    name: 'queryResultOrder'
})
@Injectable()
export class queryResultOrderFilter implements PipeTransform {
    transform(queries: QueryResult[], orderBy: string): QueryResult[] {
        var onlineFav = queries.filter(x=>x.isOnline && x.isFavorite);
        var online = queries.filter(x=> x.isOnline && !x.isFavorite);
        var fav = queries.filter(x=> !x.isOnline && x.isFavorite);

        var others = queries.filter(x=> !x.isOnline && !x.isFavorite);
        // if (orderBy == "rate") {
        //     others =  others.sort(function (a, b) { return   b.ratesAvg - a.ratesAvg });
        // }
        // else if (orderBy == "sales") {
        //     others = others.sort(function (a, b) { return   b.sales - a.sales });
        // }

        var res = [];
        onlineFav.forEach(element => {
            res.push(element);
        });
        online.forEach(element => {
            res.push(element);
        });
        fav.forEach(element => {
            res.push(element);
        });
        others.forEach(element => {
            res.push(element);
        });

        if (orderBy == "rate") {
            res =  res.sort(function (a, b) { return   b.ratesAvg - a.ratesAvg });
        }
        else if (orderBy == "sales") {
            res = res.sort(function (a, b) { return   b.sales - a.sales });
        }
        return res;
    }
}


@Pipe({
    name: 'productsResultOrder'
})
@Injectable()
export class productsResultOrderFilter implements PipeTransform {
    transform(list: ProductQueryResult[], orderBy: string): ProductQueryResult[] {
        if (orderBy == "rate") {
            return list.sort(function (a, b) { return b.specRate - a.specRate });
        }
        else if (orderBy == "sales") {
            return (list.sort(function (a, b) { return b.specSales - a.specSales }));
        }
        
        return list;
    }
}