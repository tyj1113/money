<template>
  <div class="typesWrapper">
    <ul class="types">
      <li :class="{[classPrefix+'-item']:classPrefix,
    selected:value==='-'
    }" @click="selectType('-')">支出
      </li>
      <li :class="{[classPrefix+'-item']:classPrefix,
    selected:value==='+'
    }"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop(String) value!: string;
  @Prop(String) classPrefix?: string;

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      return Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}
</script>

<style lang="scss" scoped>
.typesWrapper {
  display: flex;
  justify-content: center;
  background: #fd9a0c;
}

.types {
  display: flex;
  width: 40%;

  > li {
    padding: 14px 0;
    font-size: 18px;
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
      height: 2px;
      background: #333333;
    }
  }
}
</style>