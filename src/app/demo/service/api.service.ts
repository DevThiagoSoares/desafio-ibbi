import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8003/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // auth
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, data);
  }

  // products
  listProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products`, { headers: this.getHeaders() });
  }

  listProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  createProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, data, { headers: this.getHeaders() });
  }

  // Categories
  listCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`, { headers: this.getHeaders() });
  }

  listCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories`, data, { headers: this.getHeaders() });
  }
}
