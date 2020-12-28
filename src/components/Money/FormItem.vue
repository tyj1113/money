<template>
  <label class="formItem">
    <span>{{ this.title }}</span>
    <input type="text" :placeholder="placeholder" :value="value" @input="onValueChanged($event.target.value)">
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop(String) title?: string;
  @Prop(String) value?: string;
  @Prop(String) placeholder?: string;

  onValueChanged(value: string) {

    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;

  input {
    padding-left: 16px;
    height: 40px;
    flex-grow: 1;
    border: none;
    background: transparent;
  }
}
</style>