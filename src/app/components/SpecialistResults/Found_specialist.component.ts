import { Component, AfterViewInit, Injectable, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService, UserProfileService} from '../../serivces/index'
import { QueryResult } from '../../entities/index'
import { ToastComponent } from "../Toast/Toast.component";
import { Pop_messageComponent } from "../Pop_message/Pop_message.component";
import { LocalStorage } from "../../serivces/LocalStorage";


@Component({
    selector: 'Found_specialist',
    templateUrl: './Found_specialist.component.html',
    styleUrls: ['./Found_specialist.component.css'],
    providers: [QueryService,UserProfileService]
})

@Injectable()
export class Found_specialistComponent implements AfterViewInit{
    public id: number;
    public result: QueryResult[] = [];
    public filter: string = "rate";
    public isGuest: boolean;
    @ViewChild(ToastComponent) childcmp!: ToastComponent;
    @ViewChild(Pop_messageComponent) popup!: Pop_messageComponent;

    constructor(router: ActivatedRoute, private qService: QueryService, private userService: UserProfileService, private nav: Router) {
        this.id = router.snapshot.params['id'];
        this.isGuest = UserProfileService.GetUserProfile().isGuest;
    }

    ngAfterViewInit(): void {
        this.qService.GetQuery(this.id)
            .then(res => {
                if (res.isOk && res.isList) {
                    this.result = res.List;
                }
            })
    }

    Go2Chat(specID: string) {
        var localProfile = UserProfileService.GetUserProfile();
        if (localProfile.isGuest) {
            this.popup.LoginPop();
            return;
        }
        else {
            this.nav.navigate(['/Chat_Speciality', specID]);
        }
    }

    Go2Blog(specID: string) {
        this.nav.navigate(['/My_Hi', specID]);
    }

    Sort(val: string) {
        this.filter = val;
    }

    DefultImage(e: any) {
        e.target.src = "http://www.mjbcorp.com/images/pic-of-mark.jpg";
    }

    SetFavorite(q: QueryResult) {
        this.userService.ToggleFavorite(q.id).then(res => {
            if (res.isOk) {
                if (q.isFavorite == true) {
                    this.UploadMessage("You no longer follow this sepc");
                }
                else {
                    this.UploadMessage("Now you follow this sepc");
                }
                q.isFavorite = !q.isFavorite;
            }
        })
    }
    public UploadMessage(msg: string = "") {
        this.childcmp.ToggleToast(msg);
    }
}