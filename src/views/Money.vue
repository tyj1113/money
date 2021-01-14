<template>
  <div>
    <Layout classPrefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <div class="notes">
        <FormItem :value.sync="record.notes" placeholder="在这里添加备注" title="备注"  maxlength="20" />
      </div>
      <FormItem :value.sync="record.createAt" placeholder="在这里输入日期" title="日期"  type="date"/>
      <Tags type="edit" :tags="this.$store.state.tagList" />
          <Types :value.sync="record.type"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';



@Component({components: {NumberPad, Types, FormItem, Tags}})
export default class Money extends Vue {
  record: RecordItem = {
    tags: {},
    notes: '',
    type: '-',
    amount: 0,
    createAt: dayjs(new Date().toISOString()).format('YYYY-MM-DD')
  };
  saveRecord() {
    this.record.tags=this.$store.state.selectedTag;
    if(this.record.tags=== {}){
      return window.alert('请至少选择一个标签')
    }
    this.$store.commit('saveRecord', this.record);
    if(this.$store.state.createRecordError===null){
      window.alert('已保存')
      this.$store.commit('selectedTagClear')
      this.record.notes=''

    }
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.typesWrapper{
  display: flex;
  justify-content: center;
  background: #fd9a0c;
}
</style>
