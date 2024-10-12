import { Component, OnInit, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/app/core';

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
    @Input() followersInput: Profile = {} as Profile;
    @Input() follow: Profile = {} as Profile;
    @Input() pages_profile!: string;

    constructor() { }

    ngOnInit(): void {
        console.log(this.pages_profile);
    }

}
