import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/pages/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'store', loadChildren: () => import('./demo/pages/products/productsdemo.module').then(m => m.ListDemoModule) },
                    { path: 'charts', loadChildren: () => import('./demo/pages/charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
                    { path: 'registration', loadChildren: () => import('./demo/pages/registration/registration-routing.module').then(m => m.RegistrationRoutingModule) },
                    { path: 'shopping', loadChildren: () => import('./demo/pages/registration/shopping/shopping-routing.module').then(m => m.ShoppingRoutingModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/pages/documentation/documentation.module').then(m => m.DocumentationModule) },
                          ]
            },
            { path: 'auth', loadChildren: () => import('./demo/pages/auth/auth.module').then(m => m.AuthModule) },
            { path: 'home', loadChildren: () => import('./demo/pages/home/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
