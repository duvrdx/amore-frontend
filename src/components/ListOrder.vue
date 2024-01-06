<template>
  <div class="list-order items-center justify-center">
    <q-list class="column items-center justify-evenly" q-list v-for="item in items" :key="item.id">
      <q-item class="q-pa-sm list-item" clickable>
        <q-item-section>
          <q-item-label>{{ item.name }} | R${{ item.price.toFixed(2) }} | {{ getCategory(item.category) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="delete" round color="negative" @click="removeItem(item.id)" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="center-span">
      <span> Preço Total: R${{ total.toFixed(2) }} </span>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { onMounted, ref} from 'vue';
import useProductService from 'src/services/ProductService';
import { useCartStore } from 'src/stores/cart';
import Product from 'src/models/Product';

const productService = useProductService();
const cartStore = useCartStore();
const items = ref<Product[]>([])
const total = ref<number>(0);

const getItems = async () => {
  try {
    const cartItems = cartStore.productIds;
    if (cartItems.length !== 0) {
      const productPromises = cartItems.map((item) => productService.getProductById(item));
      const products = await Promise.all(productPromises);

      total.value = 0.0;

      products.forEach((product) => {
        total.value += product.price;
      });

      items.value = products;
    } else {
      total.value = 0.0;
      items.value = [];
    }



  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

const getCategory = (category: string) => {
  console.log(category);
  switch (category) {
    case 'anel':
      return 'Anel';
    case 'brinco':
      return 'Brinco';
    case 'colar':
      return 'Colar';
    case 'pulseira':
      return 'Pulseira';
    case 'pingente':
      return 'Pingente';
    case 'alianca':
      return 'Aliança';
    case 'relogio':
      return 'Relógio';
    case 'outro':
      return 'Outros';
    default:
      return category;
  }
};

const removeItem = async (id: number) => {
  cartStore.removeFromCart(id);
  getItems();
};


onMounted( async () => {
  getItems();
});


</script>

<style scoped>
.list-order {
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.list-item {
  width: 100%;
  height: 100%;
  border-radius: .5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 0.12rem;
}

.center-span {
  margin-top: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

span {
  font-size: 1rem;
  text-align: center;
}
</style>
