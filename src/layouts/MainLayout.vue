<template>
  <q-layout class="layout" view="lHh Lpr lFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>


        <q-toolbar-title class="bg-primary text-white" style="padding: .2rem;">
          <q-btn round color="primary" to="/">
            <q-img src="../assets/logo.png" style="width: 50px; height: 50px; border-radius: 50%;"/>
          </q-btn>

          <span class="text-secondary" style="margin-left: 1rem; font-size: 1.5rem; font-weight: bold; ">Amore Jóias</span>
        </q-toolbar-title>

        <div>

          <q-btn v-if="!isAuth" flat dense round icon="account_circle" to="/account/login"/>
          <q-btn v-else flat dense round icon="account_circle" to="/account/logout"/>

          <q-btn flat dense round icon="shopping_cart" to="/checkout"/>

          <span v-if="isAuth"> Olá, {{ username }}</span>
          <span v-else> Olá, Visitante</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="page">
      <router-view style="z-index: 1;"/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const isAuth = ref<boolean>(false);
const username = ref<string>('');
const authStore = useAuthStore();

onMounted(() => {
  isAuth.value = authStore.isAuthenticated;
  username.value = authStore.user?.username ?? '';
});

onUpdated(() => {
  isAuth.value = authStore.isAuthenticated;
  username.value = authStore.user?.username ?? '';
});

</script>

<style>
.layout{
  font-family: 'Montserrat', sans-serif;
}

.page {
  width: 100%;
  height: 100%;
  padding: 20px;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');

html{
  font-family: 'Montserrat', sans-serif;
}
</style>
