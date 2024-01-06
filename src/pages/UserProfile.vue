<template>
  <q-page class="column items-center">
    <ProfileDashboard class="dashboard"/>
    <h5 color="black"> Pedidos </h5>
    <q-scroll-area class="orders-scroll">
      <UserOrders />
    </q-scroll-area>
  </q-page>

</template>

<script lang="ts" setup>
import UserOrders from 'src/components/UserOrders.vue';
import ProfileDashboard from 'src/components/ProfileDashboard.vue';

</script>

<style scoped>
.dashboard {
  width: 100%;
}

h5{
  margin-top: 2rem;
}
.orders-scroll {
  width: 100%;
  height: 20rem;
}
</style>
