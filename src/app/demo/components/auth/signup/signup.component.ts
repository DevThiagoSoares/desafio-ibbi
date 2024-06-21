import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/demo/service/api.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-sign-up',
    templateUrl: './signup.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class SignUpComponent implements OnInit {
    email: string = '';
    password: string = '';
    confirmpassword: string = '';
    username: string = '';
    errorMessage: string = '';
    formValid: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private apiService: ApiService,
        private router: Router,
        private messageService: MessageService,
    ) {}

    ngOnInit() {
       
    }

    onSignUp() {
        // Realiza trim nos campos antes de enviar
        const trimmedUsername = this.username.trim();
        const trimmedEmail = this.email.trim();
        const trimmedPassword = this.password.trim();
        const trimmedConfirmPassword = this.confirmpassword.trim();

        const payload = {
            username: trimmedUsername,
            email: trimmedEmail,
            password: trimmedPassword
        };

        if (trimmedPassword !== trimmedConfirmPassword) {
            this.errorMessage = 'Senhas não conferem.';
            return;
        }

        this.apiService.register(payload).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário cadastrado com sucesso.', life: 3000 });
                setTimeout(() => {
                    this.router.navigate(['/auth']);
                }, 3000); 
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar usuário.', life: 3000 });
            }
        );
    }

    checkFormValidity() {
        this.formValid = !!this.email && !!this.password && !!this.confirmpassword && !!this.username;
    }
}
