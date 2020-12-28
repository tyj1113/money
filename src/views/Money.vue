<template>
  <div>
    <Layout classPrefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <div class="notes">
        <FormItem @update:value="onUpdateNotes" placeholder="在这里添加备注" title="备注" value=""/>
      </div>
      <Tags :data-source.sync="tags" @value="updateTags"/>
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
import tagListModel from '@/models/tagListModel';


@Component({components: {NumberPad, Types, FormItem, Tags}})
export default class Money extends Vue {
  tags = tagListModel.data;
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
    createAt: new Date(0)
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  updateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(note: string) {
    this.record.notes = note;
  }

  saveRecord() {
    this.$store.commit('saveRecords', this.record);
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
