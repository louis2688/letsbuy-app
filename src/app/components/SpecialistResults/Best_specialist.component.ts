import { Component, AfterViewInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService, clipSafeFilter, queryResultOrderFilter} from '../../serivces/index'
import { QueryResult } from '../../entities/index'


@Component({
    selector: 'Best_specialist',
    templateUrl: './Found_specialist.component.html',
    styleUrls: ['./Found_specialist.component.css'],
    providers: [QueryService]
})

@Injectable()
export class Best_specialistComponent implements AfterViewInit {

    public id: number;
    public result: QueryResult[] = [];
    public filter: string = "rate";

    constructor(router: ActivatedRoute, private qService: QueryService) {
        this.id = router.snapshot.params['id'];
    }

    ngAfterViewInit(): void {
        this.qService.GetBestSpec(this.id)
            .then(res => {
                if (res.isOk && res.isList) {
                    this.result = res.List;
                }
            })
    }

    Sort(val: string) {
        this.filter = val;
    }

    DefultImage(e :any) {
        e.target.src = "http://www.mjbcorp.com/images/pic-of-mark.jpg";
    }
 
}