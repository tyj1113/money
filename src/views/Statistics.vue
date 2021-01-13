<template>
  <div>
    <Layout>
      <Types :value.sync="type" class-prefix="type"/>
      <FormItem type="month" :value="today"/>
      <Records  :type="type" :groupList="groupList"/>
      <div class="chartWrapper" ref="chartWrapper">
        <Chart :option="chartOption" class="chart"/>
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
import Chart from '@/components/Chart.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Records from '@/components/Records.vue';


@Component({
  components: {Records, FormItem, Chart, Types}
})
export default class Statistics extends Vue {
  type = '-';

  get today(){
    return dayjs(new Date()).format('YYYY-MM')
  }
  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }

  get axisData() {
    const today = new Date();
    const array: { date: string; total: number } [] = [];
    for (let i = 0; i < 30; i++) {
      array.unshift({date: dayjs(today).subtract(i, 'day').format('YYYY-MM-DD'), total: 0});
      const item = this.groupList.find(item => item.title === array[0].date);
      if (item) {
        array[0].total = item.total;
      }
    }
    return array;
  }

  get chartOption() {
    const yData = this.axisData.map(item => item.date);
    const xData = this.axisData.map(item => item.total);
    return {
      tooltip: {
        show: true,
        triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      },
      xAxis: {
        type: 'category',
        data: yData,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#333'
          }
        },
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          }
        }
      },
      yAxis: {show: false},
      series: [{
        type: 'line',
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          borderWidth: 1,
          color: '#666',
          borderColor: '#666'
        },
        data: xData
      }],
      grid: {
        left: 0,
        right: 0
      }

    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupList() {
    const {recordList} = this;
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0) return [];
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

  // tagFormat(tags: string[]) {
  //   return tags.length === 0 ? '无' : tags.join(',');
  // }

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
.chart {
  width: 430%;
  &Wrapper {
    overflow: auto;
  }
}
</style>

