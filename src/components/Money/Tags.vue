<template>
  <div class="tags">
    <div class="new">
      <button @click.a="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="selectedTags.includes(tag) && 'selected'"
          @click="selected(tag)"
      >{{ tag }}
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) dataSource: string[] | undefined;
  selectedTags: string[] = [];

  selected(tag: string) {
    const index: number = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag!);
    }
    this.$emit('value',this.selectedTags)
  }

  create() {
    const tag = window.prompt('输入标签名');
    if (tag !== '') {
      if (this.dataSource) {
        this.$emit('update:dataSource', [...this.dataSource, tag]);
      }
    } else {
      window.alert('无效参数');
    }
  }

}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    li {
      $bg: #d9d9d9;
      background: $bg;
      height: 24px;
      border-radius: 12px;
      margin-right: 12px;
      padding: 0 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      padding: 0 4px;
      border-bottom: 1px solid;
    }
  }
}

</style>