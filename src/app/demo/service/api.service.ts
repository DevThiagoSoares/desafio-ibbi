import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.api_url;
  private apiDollar = environment.api_dollar_url

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // auth
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user`, data);
  }

  // products
  listProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/products`, { headers: this.getHeaders() });
  }

  listProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/products/${id}`, { headers: this.getHeaders() });
  }

  createProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/products`, data, { headers: this.getHeaders() });
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/products/${id}`, data, { headers: this.getHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/products/${id}`, { headers: this.getHeaders() });
  }

  // Categories
  listCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/categories`, { headers: this.getHeaders() });
  }

  listCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/categories/${id}`, { headers: this.getHeaders() });
  }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/categories`, data, { headers: this.getHeaders() });
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/categories/${id}`, data, { headers: this.getHeaders() });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/categories/${id}`, { headers: this.getHeaders() });
  }

  // shopping cart

  listShoppingCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/shopping-cart`, { headers: this.getHeaders()})
  }

  createShoppingCart(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/shopping-cart`, data, { headers: this.getHeaders() });
  }

  updateShoppingCart(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/shopping-cart`, data, { headers: this.getHeaders() });
  }

  // compra

  finalize(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/purchase/finalize`, {},  { headers: this.getHeaders() });
  }

  // dashboard

  topCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/dashboard/top-categories`, { headers: this.getHeaders() });
  }

  recentSales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/dashboard/recent-sales`, { headers: this.getHeaders() });
  }

  lowStockProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/dashboard/low-stock-products`, { headers: this.getHeaders() });
  }

  topSellingProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/dashboard/top-selling-products`, { headers: this.getHeaders() });
  }

  // api dollar
  getExchangeRate(): Observable<any> {
    return this.http.get<any>(this.apiDollar);
  }
}
