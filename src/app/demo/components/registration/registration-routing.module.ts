import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'products', loadChildren: () => import('./products/crud.module').then(m => m.CrudModule) },
        {path: 'categories', loadChildren: () => import('./categories/crud.module').then(m => m.CrudModule) },
        {path: 'users', loadChildren: () => import('./categories/crud.module').then(m => m.CrudModule) },
        
    ])],
    exports: [RouterModule]
})
export class RegistrationRoutingModule { }
