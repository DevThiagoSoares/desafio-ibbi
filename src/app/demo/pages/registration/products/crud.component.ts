import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category_id: string; // ou number, dependendo do tipo de id da categoria
  priceInUSD?: number;
}

interface Category {
  id: string; // ou number, dependendo do tipo de id da categoria
  name: string;
}

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService]
})
export class CrudComponent implements OnInit {
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;

  products: Product[] = [];
  product: Product = { id: '', name: '', description: '', category_id: '', image: '', price: null, quantity: null };

  selectedProducts: Product[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  categories: Category[] = []; // Variável para armazenar as categorias disponíveis

  constructor(
    private productService: ApiService, 
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'price', header: 'Price' },
      { field: 'priceInUSD', header: 'Price (USD)' },
      { field: 'category_id', header: 'Category_Id' },
      { field: 'image', header: 'Image' }
    ];
  }

  loadProducts() {
    this.productService.listProducts().subscribe((data) => {
      this.products = data;
      this.convertPricesToUSD();
    });
  }

  loadCategories() {
    this.productService.listCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openNew() {
    this.product;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.selectedProducts.forEach((product) => {
      this.productService.deleteProduct(product.id!).subscribe(() => {
        this.products = this.products.filter((val) => val.id !== product.id);
      });
    });
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produtos Deletados', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.productService.deleteProduct(this.product.id!).subscribe(() => {
      this.products = this.products.filter((val) => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Deletado', life: 3000 });
      this.product;
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim() && this.product.description.trim()) {
      if (this.product.id) {
        this.productService.updateProduct(this.product.id, this.product).subscribe((data) => {
          this.products[this.findIndexById(this.product.id!)] = data;
          this.convertPriceToUSD(data);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Atualizado', life: 3000 });
          this.products = [...this.products];
          this.productDialog = false;
          this.product = { id: '', name: '', description: '', category_id: '', image: '', price: null, quantity: null };
        });
      } else {
        this.productService.createProduct(this.product).subscribe((data) => {
          this.products.push(data);
          this.convertPriceToUSD(data);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Criado', life: 3000 });
          this.products = [...this.products];
          this.productDialog = false;
          this.product = { id: '', name: '', description: '', category_id: '', image: '', price: null, quantity: null };
        });
      }
    }
  }

  findIndexById(id: string): number {
    return this.products.findIndex((product) => product.id === id);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  convertPricesToUSD() {
    this.productService.getExchangeRate().subscribe((data) => {
      const usdRate = data.rates.USD;
      this.products.forEach((product) => {
        product.priceInUSD = product.price * usdRate;
      });
    });
  }

  convertPriceToUSD(product: Product) {
    this.productService.getExchangeRate().subscribe((data) => {
      const usdRate = data.rates.USD;
      product.priceInUSD = product.price * usdRate;
    });
  }
}
