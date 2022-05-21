<template>
  <PageComponent title="Dashboard">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    Dashboard
  </PageComponent>
</template>
<script setup>
  import PageComponent from '../../components/PageComponent.vue';
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const loading = computed(() => store.state.dashboard.loading);
  const data = computed(() => store.state.dashboard.data);

  store.dispatch("getDashboardData");

</script>

<style>

</style>