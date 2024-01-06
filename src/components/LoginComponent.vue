<template>
  <div class="" style="max-width: 25rem; min-width: 20rem;">
    <q-form
        @submit="onSubmit"
        class="q-gutter-md column login-form justify-center items-center"
      >
      <h5>Faça seu Login</h5>

      <q-input class="login-form-input" rounded outlined v-model="username" label="Usuário" />
      <q-input class="login-form-input" rounded outlined v-model="password" label="Senha" type="password" />

      <a href="/account/register">Cadastre-se</a>


      <q-btn unelevated rounded color="primary" class="login-btn" label="Login" type="submit" />
    </q-form >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import AuthService from 'src/services/AuthService';
import { useQuasar } from 'quasar';
import User from 'src/models/User';
import { useRouter } from 'vue-router';

const username = ref<string>('');
const password = ref<string>('');
const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

const onSubmit = async () => {

  authStore.clearTokens();

  try {
    const request = await AuthService.login(username.value, password.value);
    authStore.setTokens({
      accessToken: request.access_token,
      refreshToken: request.refresh_token,
    });

    await authStore.fetchUser();

    const user = authStore.user as User;

    $q.notify({
      message: `Seja bem vindo, ${user.username}!`,
      color: 'positive',
      position: 'top',
      icon: 'check',
      timeout: 2000,
    });

    router.push('/');
  } catch (error) {
    $q.notify({
      message: 'Erro ao realizar o login!',
      color: 'negative',
      position: 'top',
      icon: 'error',
      timeout: 2000,
    });
  }
};

</script>

<style scoped>
.login-form a{
  font-size: .8rem;
  margin: .5rem 0 0 0;
}

.login-form h5{
  margin: .5rem 0 0 0;
}

.login-form-input {
  width: 100%;
  margin: 1.8rem 0 0 0;
}

.login-btn {
  width: 70%;
}



</style>
