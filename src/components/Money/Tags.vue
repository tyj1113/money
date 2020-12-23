<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          :class="selectedTags.includes(tag.name) && 'selected'"
          @click="selected(tag.name)"
      >{{ tag.name }}
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch()
@Component
export default class Tags extends Vue {
  @Prop(Array) dataSource: string[] | undefined;
  selectedTags: string[] = [];

  selected(tagName: string) {
    const index: number = this.selectedTags.indexOf(tagName);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tagName!);
    }
    this.$emit('value',this.selectedTags)
  }

  create() {
    const tag = window.prompt('输入标签名');
    if (tag !== '' && tag!== ' ') {
      tagListModel.create(tag)
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