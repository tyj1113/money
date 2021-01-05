<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tags" :key="tag.id"
          :class="selectedTags.includes(tag.name) && 'selected'"
          @click="selected(tag.name)"
      >{{ tag.name }}
      </li>
    </ul>

  </div>
</template>

<script lang="ts">

import {Component} from 'vue-property-decorator';
import {TagCreate} from '@/mixins/TagCreate';

@Component
export default class Tags extends TagCreate {
  get tags() {
    return this.$store.state.tagList;
  }
  get selectedTags(){
    return this.$store.state.selectedTags
  }

  created() {
    this.$store.commit('fetchTags');
  }

  selected(tagName: string) {
    const index: number = this.selectedTags.indexOf(tagName);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tagName);
    }
    this.$store.commit('selectedTagsUpdate',this.selectedTags)
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
  background: #fff;

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