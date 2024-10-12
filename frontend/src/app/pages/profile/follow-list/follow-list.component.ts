import { Component, OnInit, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/app/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-follow-list',
    templateUrl: './follow-list.component.html',
    styleUrls: ['./follow-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        // RouterLinkActive
    ]
})

export class FollowListComponent implements OnInit {
    @Input() followersInput: Profile = {} as Profile;
    @Input() follow: Profile = {} as Profile;
    @Input() pages_profile!: string;

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log(this.pages_profile);
    }

    navigateToProfile(username: string): void {
        this.router.navigateByUrl(`/profile/${username}`);
        setTimeout(() => {
            location.reload();
        }, 50)
    }
}
