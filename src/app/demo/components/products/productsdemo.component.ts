import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  priceInUSD?: number; // Novo campo para preço em dólar
  quantity: number;
  category: {
    id: number;
    name: string;
  };
  status: string;
}

@Component({
  templateUrl: './productsdemo.component.html'
})
export class ListDemoComponent implements OnInit {
  productsCard: Product[] = [];
  filteredProductCards: Product[] = [];
  categories: any[] = []; // Array de objetos { id: number, name: string }
  selectedCategory: number | 'todos' = 'todos';
  searchQuery: string = ''; // Adicionado para armazenar o termo de busca

  constructor(private apiService: ApiService) {}

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
        priceInUSD: 0 // Inicialize o preço em dólar como 0
      }));
      this.convertPricesToUSD(); // Converter preços para dólar
      this.filterProducts(); // Aplicar filtro inicialmente
    });
  }

  loadCategories(): void {
    this.apiService.listCategories().subscribe((categories: any[]) => {
      this.categories = categories.map(category => ({
        id: category.id,
        name: category.name
      }));
      this.categories.unshift({ id: 'todos', name: 'Todas' }); // Adicionar opção 'All'
    });
  }

  filterProducts(): void {
    this.filteredProductCards = this.productsCard.filter(product => {
      const matchesCategory = this.selectedCategory === 'todos' || product.category.id === this.selectedCategory;
      const matchesSearch = this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  // Função auxiliar para determinar o status do produto com base na quantidade
  getProductStatus(quantity: number): string {
    if (quantity > 5) {
      return 'disponivel';
    } else if (quantity > 0) {
      return 'ultimas-unidades';
    } else {
      return 'indisponivel';
    }
  }

  // Método para tratar a mudança na seleção de categoria
  onCategoryChange(event: any): void {
    this.selectedCategory = event.value ? event.value.id : 'todos';
    this.filterProducts(); // Aplicar filtro ao mudar a seleção de categoria
  }

  // Método para tratar a busca por nome
  onFilter(event: any): void {
    this.searchQuery = event.target.value;
    this.filterProducts(); // Aplicar filtro ao mudar o termo de busca
  }

  // Método para converter preços para dólar
  convertPricesToUSD(): void {
    this.apiService.getExchangeRate().subscribe((data) => {
      const usdRate = data.rates.USD;
      this.productsCard.forEach((product) => {
        product.priceInUSD = product.price * usdRate;
      });
      this.filteredProductCards = [...this.productsCard]; // Atualizar produtos filtrados após conversão
    });
  }
}
