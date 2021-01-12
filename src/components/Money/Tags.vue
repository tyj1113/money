<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tags" :key="tag.id"
          :class="selectedTag===tag.name && 'selected'"
          @click="selected({tagName:tag.name,iconName:tag.iconName})"
      >
        <span class="iconWrapper">  <Icon :name="tag.iconName"/></span>
        <span>{{ tag.name }}</span>
      </li>
      <li @click="createTag">
        <span class="iconWrapper">  <Icon name="bianji"/></span>
        <span>编辑</span></li>
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

  get selectedTag() {
    return this.$store.state.selectedTag;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  selected({tagName,iconName}) {
    this.$store.commit('selectedTagUpdate', tagName);
  }
}
</script>
<style lang="scss" scoped>
.tags {
  font-size: 12px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background: #fff;

  > .current {
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 12px;

      .iconWrapper {
        border-radius: 24px;
        padding: 12px;
        display: flex;
        background: #ccc;
        justify-content: center;
      }

      svg {
        color: white;
        font-size: 24px;
      }

      &.selected {
        color: black;

        .iconWrapper {
          background: #fd9a0c;
        }
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