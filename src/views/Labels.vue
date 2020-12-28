<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button  @click.native="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>


</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {TagCreate} from '@/mixins/TagCreate';


@Component({
  components: {Button}
})
export default class Labels extends TagCreate {
  get tags() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit('fetchTags');
  }

}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  .tag {
    display: flex;
    justify-content: space-between;
    min-height: 44px;
    align-items: center;
    border-bottom: 1px solid #ccc;

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}

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