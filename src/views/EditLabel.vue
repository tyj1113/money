<template>
  <div>
    <div class="topNav">
      <Icon name="left" @click.native="goBack"/>
      <span>编辑标签</span>
      <div class="right"></div>
    </div>
    <div class="form-wrapper">
      <FormItem @update:value="updateTag" title="标签名" :value="tag.name" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>


  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {FormItem, Button}
})
export default class EditLabel extends Vue {
  tag?: {
    id: string;
    name: string;
  } = undefined;

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    const tags = this.$store.state.tagList;
    const tag = tags.find((item: {
      id: string;
      name: string;
    }) => item.id === id);
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');
    }
  }

  goBack() {
    this.$router.replace('/labels');
  }

  remove() {
    if (this.tag) {
      this.$store.commit('removeTags',this.tag);
    } else {
      window.alert('删除失败');
    }
  }

  updateTag(name: string) {
    if (name === '' || name.trim() === '') return window.alert('标签名不能为空或纯空格');
    if (this.tag) {
      this.$store.commit('updateTagName',{id:this.tag.id, name});
    }
  }


}
</script>

<style lang="scss" scoped>
.topNav {
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;

  svg {
    width: 24px;
    height: 24px;
  }

  .right {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: #fff;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>