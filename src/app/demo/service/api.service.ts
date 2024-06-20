import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8003/api';
  private apiDollar = 'https://api.exchangerate-api.com/v4/latest/BRL'

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

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/products/${id}`, data, { headers: this.getHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() });
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

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/categories/${id}`, data, { headers: this.getHeaders() });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  // shopping cart

  listShoppingCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/shopping-cart`, { headers: this.getHeaders()})
  }

  createShoppingCart(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/shopping-cart`, data, { headers: this.getHeaders() });
  }

  updateShoppingCart(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/shopping-cart`, data, { headers: this.getHeaders() });
  }

  // api dollar
  getExchangeRate(): Observable<any> {
    return this.http.get<any>(this.apiDollar);
  }
}
