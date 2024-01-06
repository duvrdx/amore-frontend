<template>
  <div class="user-orders items-center justify-center">
    <h5 color="black"> Pedidos </h5>

    <q-list class="column items-center justify-evenly" q-list v-for="item in items" :key="item.id">
      <q-item class="q-pa-sm list-item" clickable>
        <q-item-section>
          <q-item-label>{{ item.id }} | {{ formatStatus(item.status) }} | {{ formatTimestamp(item.created_at) }} </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn icon="info" round color="accent"/>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import useOrderService from 'src/services/OrderService';
import Order from 'src/models/Order';
import { useAuthStore } from 'src/stores/auth';

const orderService = useOrderService();
const items = ref<Order[]>([])
const total = ref<number>(0);
const authStore = useAuthStore();

const getItems = async () => {
  const orderItems = await orderService.getOrders();
  const userOrders: Order[] = [];

  orderItems.forEach((order: Order) => {
    if (order.customer === authStore.user?.id && order.items.length > 0) {
      userOrders.push(order);
    }
  });

  items.value = userOrders;
};

onMounted( async () => {
  getItems();
});

const formatTimestamp = (timestamp: string) => {
  const dateObject = new Date(timestamp);
  return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'created':
      return 'Aguardando Aprovação';
    case 'paid':
      return 'Pago';
    case 'delivering':
      return 'A Caminho';
    case 'done':
      return 'Finalizado';
    case 'canceled':
      return 'Cancelado';
    default:
      return 'Desconhecido';
  }
};


</script>

<style scoped>
.user-orders {
  width: 90%;
  height: 100%;
  margin: 1rem;
}

.list-item {
  min-width: 30vw;
  height: 100%;
  border-radius: .5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 0.12rem;
}

h5{
  margin: -4rem 0 1rem 0;
  text-align: center;
}

.center-span {
  margin-top: .5rem;
  display: flex;
}

</style>
