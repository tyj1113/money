<template>
  <ul class="types">
    <li :class="this.type==='-' &&' selected'" @click="selectType('-')">支出</li>
    <li :class="this.type==='+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  type = '-';
  selectType(type: string) {
    if(type!=='-'&&type!=='+'){
      return Error('type is unknown')
    }
    this.type = type;
  }
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