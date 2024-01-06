<template>
  <q-page class="row wrap items-top justify-evenly item-holder">
    <q-list v-for="item in items" :key="item.id">
        <ProductCard :image=item.image :title=item.name :price=item.price
        :description=item.description @add-to-cart="handleAddToCart"
        :product-id=item.id :category=item.category :size=item.size />
      </q-list>
  </q-page>
</template>

<script lang="ts" setup>
import ProductCard from 'src/components/ProductCard.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import Product from 'src/models/Product';
import useProductService from 'src/services/ProductService';
import { useCartStore } from 'src/stores/cart';


const items = ref<Product[]>();
const productService = useProductService();
const cartStore = useCartStore();
const $q = useQuasar();

const getItems = async () => {
  try {
    const response = await productService.getProducts();
    items.value = response;
    console.log(response);
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};


const handleAddToCart = (payload: { productId: number }) => {
  try {
    const productId = payload.productId;
    cartStore.addToCart(productId);
    $q.notify({
      message: 'Adicionado ao Carrinho!',
      color: 'positive',
      position: 'top',
      icon: 'check',
      timeout: 2000,
    });
  } catch (error) {
    $q.notify({
      message: 'Erro ao adicionar!',
      color: 'negative',
      position: 'top',
      icon: 'error',
      timeout: 2000,
    });
  }

};

onMounted( async () => {
  $q.loading.show();
  getItems();
  $q.loading.hide();

});
</script>

<style scoped>
.item-holder {
  width: 100%;
  height: 100%;
  padding-top: 2rem;
}
</style>
