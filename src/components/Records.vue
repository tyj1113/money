<template>
  <ol v-if="groupList.length!==0">
    <li v-for="(group,index) in groupList" :key="index">
      <h3 class="title">{{ dateFormat(group.title) }}<span>￥{{ group.total }}</span></h3>
      <ol>
        <li class="record" v-for="item in group.items" :key="JSON.stringify(item)">
            <div class="left">
              <Icon :name="item.tags.iconName"/>
              <span>{{ item.tags.tagName }}</span>
            </div>
          <span class="note">{{ item.notes }}</span>
          <div class="right">
            <span>￥{{ item.amount }}</span>
            <Icon name="lajitong" @click.native="remove(item)"/>
          </div>

        </li>
      </ol>
    </li>
  </ol>
  <div v-else class="noRecord">
    没有相关记录
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class Records extends Vue {
  @Prop(String) type: string;
  @Prop() groupList: [];
  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
  remove(item){
    const flag=window.confirm('确定要删除吗')
    if(flag){
      this.$store.commit('deleteRecord',item)
    }
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
  .left{
    svg{
      margin-right: 5px;
    }
  }
  .right {
    display: flex;
    align-items: center;

    svg{
      margin-left: 5px;
    font-size: 12px;
  }
  }
}
.noRecord {
  text-align: center;
  margin: 50px auto 0;
}
</style>