import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
  templateUrl: './shopping.component.html',
  providers: [MessageService]
})
export class ShoppingComponent implements OnInit {
  cart: any | undefined;
  displayConfirmFinalize: boolean = false;
  displayConfirmClearCart: boolean = false;

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
    this.displayConfirmClearCart = false;
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

  updateCartItem(productId: string, newQuantity: number) {
    const itemToUpdate = [{ product_id: productId, quantity: newQuantity }];
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

  confirmFinalize() {
    this.displayConfirmFinalize = true;
  }

  confirmClearCart() {
    this.displayConfirmClearCart = true;
  }

  hideConfirmFinalizeDialog() {
    this.displayConfirmFinalize = false;
  }

  hideConfirmCleanCartDialog() {
    this.displayConfirmClearCart = false;
  }

  finalizePurchase() {
    this.cartService.finalize().subscribe(
      () => {
        this.loadCart();
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Compra finalizada com sucesso', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao finalizar a compra', life: 3000 });
      }
    );
    this.displayConfirmFinalize = false;
  }

  isCartEmpty(): boolean {
    return !this.cart || !this.cart.products || this.cart.products.length === 0;
  }
}
