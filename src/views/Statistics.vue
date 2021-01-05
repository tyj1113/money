<template>
  <div>
    <Layout>
      <Types :value.sync="type" class-prefix="type"/>
      <ol v-if="groupList.length!==0">
        <li v-for="group in groupList" :key="group.title">
          <h3 class="title">{{ dateFormat(group.title) }}<span>￥{{ group.total }}</span></h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.createAt">
              <span>{{ tagFormat(item.tags) }}</span>
              <span class="note">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noRecord">
        没有相关记录
      </div>

    </Layout>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import clone from '@/lib/clone';
import dayjs from 'dayjs';


@Component({
  components: {Types}
})
export default class Statistics extends Vue {
  type = '-';

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if(newList.length===0) return []
    type Result = { title: string; total: number; items: RecordItem[] }[]
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format('YYYY-MM-DD'),
        total: 0,
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(current.createAt).isSame(last.title, 'day')) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format('YYYY-MM-DD'),
          total: 0,
          items: [current]
        });
      }
    }
    result.forEach(item => {
      item.total = item.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  tagFormat(tags: string[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  dateFormat(date: string) {
    const today = new Date();
    if (dayjs(today).isSame(dayjs(date), 'day')) {
      return '今天';
    } else if (dayjs(today).subtract(1, 'day').isSame(dayjs(date), 'day')) {
      return '昨天';
    } else if (dayjs(today).subtract(2, 'day').isSame(dayjs(date), 'day')) {
      return '前天';
    } else {
      return date;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-item {
  background: #C4C4C4;

  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}

%item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 8px 16px;
  line-height: 24px;
}

.title {
  @extend %item
}

.record {
  @extend %item;
  background: white;

  .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
}
.noRecord{
  text-align: center;
  margin: 50px auto 0;
}
</style>

