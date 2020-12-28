import Component from 'vue-class-component';
import Vue from 'vue';


@Component
export class TagCreate extends Vue{
  createTag() {
    const tag = window.prompt('输入标签名');
    if (tag !== '' && tag !== ' ' && tag) {
      this.$store.commit('createTag', tag);
    } else {
      window.alert('无效参数');
    }
  }
}