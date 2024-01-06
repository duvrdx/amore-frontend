<template>
  <div class="" style="max-width: 25rem; min-width: 20rem;">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md column register-form justify-center items-center"
    >
      <h5>Crie sua Conta</h5>


        <q-input
          class="register-form-input"
          rounded
          outlined
          v-model="first_name"
          label="Nome"
        />
        <q-input
          class="register-form-input"
          rounded
          outlined
          v-model="last_name"
          label="Sobrenome"
        />

      <q-input
        class="register-form-input"
        rounded
        outlined
        v-model="username"
        label="Usuário"
      />
      <q-input
        class="register-form-input"
        rounded
        outlined
        v-model="email"
        label="E-Mail"
        :rules="[val => emailIsValid(val) || 'Email inválido']"
      />
      <q-input
        class="register-form-input"
        rounded
        outlined
        v-model="phone"
        label="Telefone"
        mask="(##) #####-####"
      />

      <q-input
          class="register-form-input"
          rounded
          outlined
          v-model="zip_code"
          label="CEP"
        />

        <q-input
          class="register-form-input"
          rounded
          outlined
          v-model="house_number"
          label="Numero da Casa"
        />
      <q-input
        class="register-form-input"
        rounded
        outlined
        v-model="password"
        label="Senha"
        type="password"
      />
      <q-input
        class="register-form-input"
        rounded
        outlined
        v-model="confirmPassword"
        label="Repita a Senha"
        type="password"
        :rules="[val => val === password || 'As senhas não coincidem']"
      />

      <span> Já tem uma conta? <a href="/account/login">Entre aqui</a></span>

      <q-btn
        unelevated
        rounded
        color="primary"
        class="register-btn"
        label="Cadastrar"
        type="submit"
      />
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserService from 'src/services/UserService';
import User from 'src/models/User';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const username = ref<string>('');
const email = ref<string>('');
const first_name = ref<string>('');
const last_name = ref<string>('');
const zip_code = ref<string>('');
const house_number = ref<number>(0);
const phone = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const userService = UserService();
const $q = useQuasar();
const router = useRouter();

const onSubmit = async () => {
  const user: User = {
    first_name: first_name.value,
    last_name: last_name.value,
    id: 0,
    username: username.value,
    email: email.value,
    phone:  phone.value.replace(/\D/g, ''),
    password: password.value,
    zip_code: zip_code.value,
    house_number: house_number.value,
  };

  try {
    const request = await userService.create(user);
    $q.notify({
      message: 'Usuário criado com sucesso! Faça seu login.',
      color: 'positive',
      position: 'top',
      icon: 'check',
      timeout: 2000,
    });

    router.push('/account/login');
  } catch (error) {
    console.log(error);
    $q.notify({
      message: 'Erro ao criar usuário!',
      color: 'negative',
      position: 'top',
      icon: 'error',
      timeout: 2000,
    });
  }
};

const emailIsValid = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

</script>

<style scoped>

.register-form a, .register-form span{
  font-size: .8rem;
  margin: .5rem 0 0 0;
}

.register-form h5{
  margin: 3rem 0 0 0;
}

.register-form-input {
  width: 100%;
}

.register-btn {
  width: 70%;
}

.name-form {
  width: 100%;
}

.name-form q-input {
  width: 100%;
}



</style>
