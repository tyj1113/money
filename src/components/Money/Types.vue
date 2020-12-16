<template>
  <ul class="types">
    <li class="selected">收入</li>
    <li>支出</li>
  </ul>
</template>

<script lang="ts">
export default {
name: "Types"
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;

  > li {
    padding: 14px 0;
    font-size: 24px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333333;
    }
  }
}
</style>