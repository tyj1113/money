<template>
  <label class="notes">
    <span>备注</span>
    <input type="text" placeholder="在这里输入备注" v-model="value">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding-left: 16px;

  input {
    padding-left: 16px;
    height: 64px;
    flex-grow: 1;
    border: none;
    background: transparent;
  }
}
</style>