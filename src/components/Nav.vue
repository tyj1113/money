<template>
      <nav>
        <router-link to="/money">记账</router-link> |
        <router-link to="/labels">标签</router-link>|
        <router-link to="/statistics">统计</router-link>
      </nav>
</template>

<script lang="ts">
export default {
name: "Navs"
}
</script>

<style lang="scss" scoped>
nav{
  border: 1px solid blue;
}
</style>