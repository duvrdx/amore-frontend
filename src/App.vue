<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from './stores/auth';

const expirationTimeInSeconds = 30;
let tokenCleanupTimer: string | number | NodeJS.Timeout | undefined;
const authStore = useAuthStore();

const setupTokenCleanupTimer = () => {
  tokenCleanupTimer = setTimeout(() => {
    authStore.clearTokens();
  }, expirationTimeInSeconds * 1000);
};

onMounted(() => {
  setupTokenCleanupTimer();
});
</script>
