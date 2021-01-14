<template>
  <div class="tags">
    <ul class="current" v-if="type==='edit'">
      <li  v-for="tag in tags" :key="tag.id"
          :class="selectedTag===tag && 'selected'"
          @click="selected(tag)"
      >
        <span class="iconWrapper">  <Icon :name="tag.iconName"/></span>
        <span >{{ tag.tagName }}</span>
      </li>
        <router-link to="/labels" @click="this.$store.commit('selectedTagClear')">
          <li>
          <span class="iconWrapper">  <Icon name="bianji"/></span>
          <span>编辑</span>
          </li>
        </router-link>
    </ul>
    <ul class="current" v-else>
      <li  v-for="tag in tags" :key="tag"
           :class="selectedTag===tag && 'selected'"
           @click="selectedIcon(tag)">
        <span class="iconWrapper">  <Icon :name="tag"/></span>
      </li>
    </ul>

  </div>
</template>

<script lang="ts">

import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Tags extends Vue {
  @Prop(String) type?: string;
  @Prop() tags?: [];
  get selectedTag() {
    return this.$store.state.selectedTag;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  selected(tag: string) {
    this.$store.commit('selectedTagUpdate', tag);
  }
  selectedIcon(tag: string){
    this.$store.commit('selectedTagUpdate', tag);

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

}

</style>