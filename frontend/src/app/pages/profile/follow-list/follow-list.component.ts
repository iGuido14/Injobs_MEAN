import { Component, OnInit, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/app/core';
import { Follower_follow } from 'src/app/core/models/follower_follow.model';

@Component({
    selector: 'app-follow-list',
    templateUrl: './follow-list.component.html',
    styleUrls: ['./follow-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})

export class FollowListComponent implements OnInit {
    @Input() followersInput: Follower_follow = {} as Follower_follow;
    @Input() follow: Follower_follow = {} as Follower_follow;
    @Input() pages_profile!: string;

    constructor() { }

    ngOnInit(): void {
        console.log(this.pages_profile);
    }

}
