import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SignUpComponent }
    ])],
    exports: [RouterModule]
})
export class SignUpRoutingModule { }
