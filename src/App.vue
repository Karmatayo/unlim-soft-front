<script setup>
import TabMenu from './components/TabMenu.vue';
</script>

<template>
    <TabMenu />
    <router-view />
</template>

<style lang="scss">
body {
    font-family: (--font-family);
}
</style>
