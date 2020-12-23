<template>
  <div>
    <Layout classPrefix="layout">
      {{this.recordList}}
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Types :value.sync="record.type"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" @value="updateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';


@Component({components: {NumberPad, Types, Notes, Tags}})
export default class Money extends Vue {
  recordList=recordListModel.fetch()
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
    createAt: new Date(0)
  };
  tags: string[] = ['衣', '食', '住', '行'];

  updateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(note: string) {
    this.record.notes = note;
  }

  saveRecord() {
    const newRecord: RecordItem = recordListModel.clone(this.record)
    newRecord.createAt = new Date();
    this.recordList.push(newRecord);
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList)
  }


}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
