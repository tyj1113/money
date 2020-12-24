<template>
    <div>
      <button class="createTag" ><slot/></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue{

}
</script>

<style lang="scss" scoped>
.createTag {
  background: #767676;
  color: white;
  border: none;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>