import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';
    valCheck: string[] = ['remember'];
    rememberMe: boolean = false;
    errorMessage: string = '';

    constructor(
        public layoutService: LayoutService,
        private apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit() {
        // Recupera o email e a senha do localStorage se "Lembrar de mim" estiver marcado
        this.rememberMe = localStorage.getItem('rememberMe') === 'true';
        if (this.rememberMe) {
            this.email = localStorage.getItem('email') || '';
            this.password = localStorage.getItem('password') || '';
        }
    }

    onLogin() {
        this.apiService.login(this.email, this.password).subscribe(
            (response: any) => {
                if (this.rememberMe) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('email', this.email);
                    localStorage.setItem('password', this.password);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    localStorage.removeItem('rememberMe');
                }
                this.router.navigate(['/store']);
            },
            (error: any) => {
                this.errorMessage = 'Login failed. Please check your email and password.';
                console.error('Login failed', error);
            }
        );
    }
}
