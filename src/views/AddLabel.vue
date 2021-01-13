<template>
  <div>
    <div class="topNav">
      <Icon name="left" @click.native="goBack"/>
      <span>新增标签</span>
      <div class="right"></div>
    </div>
    <Tags :tags="this.$store.state.allTag"/>
    <div class="form-wrapper">
      <FormItem placeholder="请输入标签名最大支持长度为4" :value.sync="tagName"/>
    </div>
    <div class="button-wrapper">
      <Button @click.native="createTag">添加标签</Button>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import Tags from '@/components/Money/Tags.vue';

@Component({
  components: {Tags, FormItem, Button}
})
export default class AddLabel extends Vue {

  tagName: string = '';

  get iconName() {
    return this.$store.state.selectedTag;
  }

  createTag() {
    const tagName = this.tagName;
    const iconName = this.iconName;
    if (tagName !== '' && tagName.trim() !== '' && tagName) {
      this.$store.commit('createTag', {tagName, iconName});
      if (this.$store.state.createTagError) {
        window.alert(this.$store.state.createTagError.message);
      } else {
        window.alert('添加成功');
        this.$router.replace('/labels');
      }
    } else {
      window.alert('无效参数');
    }
  }

  goBack() {
    this.$router.replace('/labels');
  }

  remove() {
    if (this.tag) {
      this.$store.commit('removeTags', this.tag);
    } else {
      window.alert('删除失败');
    }
  }

  updateTag(name: string) {
    if (name === '' || name.trim() === '') return window.alert('标签名不能为空或纯空格');
    if (this.tag) {
      this.$store.commit('updateTagName', {id: this.tag.id, name});
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