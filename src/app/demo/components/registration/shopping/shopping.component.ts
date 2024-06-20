import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';

interface CartItem {
  product_id: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  image: string;
  name: string;
}

interface Cart {
  user_id: number;
  total_cart_value: number;
  products: CartItem[];
}

@Component({
  templateUrl: './shopping.component.html',
  providers: [MessageService]
})
export class ShoppingComponent implements OnInit {
  cart: Cart | undefined;

  constructor(
    private messageService: MessageService,
    private cartService: ApiService
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.listShoppingCart().subscribe(
      (data) => {
        this.cart = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar o carrinho', life: 3000 });
      }
    );
  }

  clearCart() {
    const clearShopping = this.cart.products.map((item) => ({
      product_id: item.product_id,
      quantity: 0
    }));
    this.cartService.updateShoppingCart(clearShopping).subscribe(
      () => {
        this.loadCart();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Carrinho limpo', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao limpar o carrinho', life: 3000 });
      }
    );
  }

  removeFromCart(productId: string) {
    const itemToRemove = [{ product_id: productId, quantity: 0 }];
    this.cartService.updateShoppingCart(itemToRemove).subscribe(
      () => {
        this.loadCart();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto removido do carrinho', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao remover produto do carrinho', life: 3000 });
      }
    );
  }

  updateCartItem(productId: Cart, newQuantity: any) {
    const itemToUpdate = [{ product_id: productId, quantity: newQuantity.value }];
    this.cartService.updateShoppingCart(itemToUpdate).subscribe(
      () => {
        this.loadCart();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Quantidade atualizada', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a quantidade', life: 3000 });
      }
    );
  }
}
