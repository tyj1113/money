import Component from 'vue-class-component';
import Vue from 'vue';


@Component
export class TagCreate extends Vue{
  createTag() {
    const tag = window.prompt('输入标签名');
    if (tag !== '' && tag !== ' ' && tag) {
      this.$store.commit('createTag', tag);
      if(this.$store.state.createTagError){
        window.alert(this.$store.state.createTagError.message)
      }else{
        window.alert('添加成功')
      }
    } else {
      window.alert('无效参数');
    }
  }
}