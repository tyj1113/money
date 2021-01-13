<template>
  <div class="numberPad">
    <div class="numberInput">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="ok">ok</button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) value!: number;
  output = this.value.toString();

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement, input = button.textContent!
        , length = this.output.length;
    if (length === 16) {return;}
    if (input === '.' && this.output.includes('.')) {return;}
    if (this.output === '0') {
      if ('0123456789'.includes(input)) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
      return;
    }
    this.output = this.output.slice(0, -1);
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.$emit('update:value', parseFloat(this.output));
    this.$emit('submit');
    this.output = '0';
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .numberInput {
    @extend %innerShadow;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 0 9px;
    height: 54px;
    background: #fff;
  }

  .buttons {
    position: relative;
    background: #ececed;

    button {
      margin: 0.5% 0.5% 0.5% 0.5%;
      width: 24%;
      height: 48px;
      border: none;
      background: #fff;
      border-radius: 5px;
    }

    :nth-child(12) {
      width: 49%;
    }

    :nth-child(13) {

    }

    :nth-child(14) {
      height: 100px;
      position: absolute;
      bottom: 0;
      right: 0;

    }

  }
}
</style>