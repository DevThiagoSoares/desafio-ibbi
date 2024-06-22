import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  priceInUSD?: number;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
  status: string;
}

@Component({
  templateUrl: './productsdemo.component.html',
  providers: [MessageService]
})
export class ListDemoComponent implements OnInit {
  productsCard: Product[] = [];
  filteredProductCards: Product[] = [];
  categories: any[] = []; 
  selectedCategories: any[] = []; 
  searchQuery: string = '';

  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.apiService.listProducts().subscribe((products: any[]) => {
      this.productsCard = products.map(product => ({
        id: product.id,
        image: product.image || '/assets/demo/images/product/default.jpg',
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        status: this.getProductStatus(product.quantity),
        priceInUSD: 0 
      }));
      this.convertPricesToUSD(); 
      this.filterProducts(); 
    });
  }

  loadCategories(): void {
    this.apiService.listCategories().subscribe((categories: any[]) => {
      this.categories = categories.map(category => ({
        id: category.id,
        name: category.name
      }));
      this.categories.unshift({ id: 'todos', name: 'Todas' });
    });
  }

  
  onCategoryChange(event: any): void {
    if (event.value && event.value.length > 0 && event.value[0].id === 'todos') {
      this.selectedCategories = [];
    } else {
      this.selectedCategories = event.value.map(option => option.id);
    }
    this.filterProducts(); 
  }

  productMatchesSelectedCategories(product: Product): boolean {
    if (this.selectedCategories.length === 0 || this.selectedCategories.includes('todos') || this.selectedCategories.includes(product.category.id)) {
      return true;
    }
    return false;
  }

  filterProducts(): void {
    this.filteredProductCards = this.productsCard.filter(product => {
      const matchesCategory = this.productMatchesSelectedCategories(product);
      const matchesSearch = this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  getProductStatus(quantity: number): string {
    if (quantity > 5) {
      return 'disponivel';
    } else if (quantity > 0) {
      return 'ultimas-unidades';
    } else {
      return 'indisponivel';
    }
  }

  onFilter(event: any): void {
    this.searchQuery = event.target.value;
    this.filterProducts(); 
  }

  addToCart(product: Product): void {
    const payload = {
      product_id: product.id,
      quantidade: 1
    };

    this.apiService.createShoppingCart(payload).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto adicionado ao carrinho', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar produto ao carrinho', life: 3000 });
      }
    );
  }

  convertPricesToUSD(): void {
    this.apiService.getExchangeRate().subscribe((data) => {
      const usdRate = data.rates.USD;
      this.productsCard.forEach((product) => {
        product.priceInUSD = product.price * usdRate;
      });
      this.filteredProductCards = [...this.productsCard];
    });
  }
}
