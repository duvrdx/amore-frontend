<template>
  <q-page class="column items-center justify-evenly">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="shopping_bag" color="primary" text-color="white" />
          <span class="q-ml-sm">Deseja finalizar o pedido?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Finalizar" color="primary" @click="createOrder()" v-close-popup />
          <q-btn flat label="Voltar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-ma-md column items-center justify-evenly list-holder">
      <h4 color="black"> Carrinho </h4>
        <q-scroll-area  v-if="!cartStore.isEmpty" class="orders-scroll">
          <ListOrder />
        </q-scroll-area>
        <h5 v-else> Seu carrinho está vazio! :( </h5>

        <q-btn-group outline class="btn-group-checkout">
          <q-btn color="primary" @click="confirm = true" label="Finalizar Pedido" icon="shopping_bag" />
          <q-btn color="positive" to="/" label="Voltar a Página Inicial" icon="home" />
          <q-btn color="negative" @click="clearCart()" label="Limpar Carrinho" icon="cancel" />
        </q-btn-group>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import ListOrder from 'src/components/ListOrder.vue';
import { useCartStore } from 'src/stores/cart';
import useCartService from 'src/services/CartService';
import { useAuthStore } from 'src/stores/auth';
import Cart from 'src/models/Cart';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import {ref} from 'vue';

const cartStore = useCartStore();
const cartService = useCartService();
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();
const confirm = ref<boolean>(false);

const clearCart = () => {
  cartStore.clearCart();

  $q.notify({
      message: 'O carrinho foi limpo.',
      color: 'positive',
      position: 'top',
      icon: 'check',
      timeout: 3000,
    });

    router.push('/');
};

const createOrder = async () => {
  const productIds = cartStore.productIds as number[];
  const userId = authStore.user?.id;

  if (!userId) {
    $q.notify({
      message: 'Você precisa estar logado para finalizar o pedido.',
      color: 'negative',
      position: 'top',
      icon: 'check',
      timeout: 5000,
    });
    return;
  }

  if(!productIds.length){
    $q.notify({
      message: 'Você precisa ter produtos no carrinho para finalizar o pedido.',
      color: 'negative',
      position: 'top',
      icon: 'check',
      timeout: 5000,
    });
  }

  try {
    const cart: Cart = {
      id: 0,
      customer: userId as number,
      items: []
    };

    const response = await cartService.create(cart);

    await Promise.all(
      productIds.map(async (productId) => {
        const item = await cartService.addItem(response.id, productId);
        cart.items.push(item);
      })
    );

    $q.notify({
      message: 'Seu pedido está em processamento.',
      color: 'positive',
      position: 'top',
      icon: 'info',
      timeout:2000,
    });

    $q.loading.show({})


    await cartService.checkout(response.id);

    $q.loading.hide()

    cartStore.clearCart();


    $q.notify({
      message: 'As informações sobre o pedido e pagamento foram enviados para o seu e-mail.',
      color: 'positive',
      position: 'top',
      icon: 'check',
      timeout:2000,
    });

    router.push('/');

  } catch (error) {
    console.log(error);
    $q.notify({
      message: 'Aconteceu algum erro! Tente novamente mais tarde.',
      color: 'negative',
      position: 'top',
      icon: 'check',
      timeout: 5000,
    });
  }
};


</script>

<style scoped>
.list-holder {
  width: 100%;
  max-width: 600px; /* Adjust the value based on your design */
  margin: 0 auto; /* Center the element */
  padding: 1rem; /* Add padding for better visual appeal */
}

.btn-group-checkout {
  margin-top: 1rem; /* Adjust margin for better spacing */
  display: flex;
  justify-content: space-around; /* Distribute buttons evenly */
}

span {
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: center;
}

h4 {
  text-align: center;
}

.orders-scroll {
  width: 100%;
  height: 20rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 600px) {
  /* Add more media queries for larger screens if needed */
  .list-holder {
    width: 70%;
  }
}
</style>

