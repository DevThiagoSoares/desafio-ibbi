import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Loja', icon: 'pi pi-shopping-bag', routerLink: ['store'] },
                    {
                        label: 'Controle de Produtos',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/registration/products']
                    },
                    {
                        label: 'Controle de Categorias',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/registration/categories']
                    },
                    {
                        label: 'Carrinho de compras',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['/shopping']
                    },
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-chart-pie',
                        routerLink: ['/charts']
                    },
                ]
            }
        ]
    }
}
