<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Navs'
};
</script>

<style lang="scss" scoped>
nav {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  display: flex;
  font-size: 12px;
background: white;
  > .item {
    width: 33.3333%;
    padding: 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  .item.selected {
    color:#fd9a0c;
  }
}
</style>