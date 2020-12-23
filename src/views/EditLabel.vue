<template>
  <div>
    <div class="topNav">
      <Icon name="left"/>
      <span>编辑标签</span>
      <div class="right"></div>
    </div>
    <div class="form-wrapper">
      <FormItem title="标签名" value="" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button  >删除标签</Button>
    </div>


</div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
@Component({
  components: {FormItem,Button}
})
export default class EditLabel extends Vue {

}
</script>

<style lang="scss" scoped>
.topNav{
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  svg{
    width: 24px;
    height: 24px;
  }
  .right{
    width: 24px;
    height: 24px;
  }
}
.form-wrapper{
  background: #fff;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>