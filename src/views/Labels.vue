<template>
  <div>
    <Layout>
      <div class="tags" >
        <router-link to="/labels/add" class="tag">
          新增标签
          <Icon name="right" class="right"/>
        </router-link>
        <ul>
          <li class="tag" v-for="tag in tags" :key="tag.id" >
            <div class="icon-wrapper">
              <Icon :name="tag.iconName" class=""></Icon>
              {{ tag.tagName }}
            </div>
            <div class="click-wrapper" @click="remove(tag)">
              <Icon name="lajitong" class-prefix="remove" />
            </div>

          </li>
        </ul>

      </div>

    </Layout>
  </div>


</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import Vue from 'vue';



@Component({
  components: {Button}
})
export default class Labels extends Vue {
  get tags() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit('fetchTags');
  }
  remove(tag: Tag) {
    const flag=window.confirm('确定要删除该标签吗')
    if (flag) {
      this.$store.commit('removeTags',tag);
    } else {
      return
    }
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
    min-height: 54px;
    align-items: center;
    border-bottom: 1px solid #ccc;
  .icon-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }

    ::v-deep svg{
      margin: 0 20px;
      font-size: 32px;
      color:#ccc
    }
    ::v-deep .remove-item {
      font-size: 18px;
    }

    //.right svg {
    //
    //  width: 18px;
    //  height: 18px;
    //  color: #666;
    //  margin: 0 16px 0 0;
    //}
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
  }
}
</style>