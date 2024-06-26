import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    items: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router) { }

    ngOnInit() {
        this.items = [
            { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => this.logout(),   style: { 'color': 'red', 'font-weight': 'bold' } }
        ];
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/auth']);
    }
}
