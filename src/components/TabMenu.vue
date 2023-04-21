<script setup>
/* eslint-disable */
import TabMenu from "primevue/tabmenu";
import { ref } from "vue";

const items = ref([
    {
        label: 'Главная',
        icon: 'pi pi-fw pi-home',
        to: '/'
    },
    {
        label: 'Формирование групп',
        icon: 'pi pi-fw pi-users',
        to: '/test'
    }
]);
</script>

<template>
    <TabMenu :model="items" />
</template>

<style>
</style>