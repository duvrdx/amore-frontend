import { defineStore } from 'pinia';

interface CartState {
  productIds: number[];
}

export const useCartStore = defineStore('cart',{
  state: (): CartState => ({
    productIds: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]') : []
  }),

  actions: {
    addToCart(productId: number) {
      this.productIds.push(productId)
      this.saveToLocalStorage()
    },

    removeFromCart(productId: number) {
      const indexToRemove = this.productIds.indexOf(productId);

      if (indexToRemove !== -1) {
        this.productIds.splice(indexToRemove, 1);
        this.saveToLocalStorage();
      }
    },

    clearCart() {
      this.productIds = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.productIds))
    }
  },
  getters: {
    getCartData(): CartState {
      return {
        productIds: this.productIds
      };
    },
    isEmpty(): boolean {
      return this.productIds.length === 0;
    }
  }
});
