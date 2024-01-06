<template>
  <div class="items-center column justify-center">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Perfil</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ user?.first_name }}</div>
          <div class="text-caption text-grey">
            Usuario: {{ user?.username }} <br>
            Telefone: {{ user?.phone }} <br>
            Endereço: {{ getAddress() }} <br>
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn @click="logout()" color="negative"> Logout </q-btn>
      </q-card-actions>
    </q-card>
  </div>

</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useCartStore } from 'src/stores/cart';
import useUserService from 'src/services/UserService';
import User from 'src/models/User';

const authStore = useAuthStore();
const $q = useQuasar();
const router = useRouter();
const cartStore = useCartStore();
const user = ref();
const userService = useUserService();

const logout = () => {
  authStore.clearTokens();
  cartStore.clearCart();
  $q.notify({
    message: 'Deslogado com sucesso!',
    color: 'positive',
    position: 'top',
    icon: 'check',
    timeout: 2000,
  });
  router.push('/');
};

const getAddress = () => {
  try{
    if (user.value) {
      return user.value.zip_code;
    }
  }catch (error) {
    return ''
  }
}

const getItems = async () => {
  user.value = await authStore.user;
  user.value = await userService.getUserById(user.value.id);
}
onMounted( async () => {
  await getItems();
});

</script>


<style scoped>
.my-card{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
