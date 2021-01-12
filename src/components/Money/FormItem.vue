<template>
  <label class="formItem">
    <span class="note">{{ this.title }}</span>
    <template v-if="type==='date'">
      <input :type="type || 'text' " :placeholder="placeholder" :value="formatDate(value)" @input="onValueChanged($event.target.value)">
    </template>
    <template v-else>
      <input :type="type || 'text' " :placeholder="placeholder" :value="value" @input="onValueChanged($event.target.value)">
    </template>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop(String) title?: string;
  @Prop(String) value?: string;
  @Prop(String) placeholder?: string;
  @Prop(String) type?: string;
  formatDate(date: string){
    return dayjs(date).format('YYYY-MM-DD')
  }
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  background: #fff;
  .note{
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>