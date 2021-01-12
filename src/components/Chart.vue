<template>
    <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue{
  @Prop() option?: EChartOption;
  chart?: ECharts;
  @Watch('option')
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue);
  }
  mounted(){
    if(this.option===undefined){
      return console.error('option为空')
    }
      this.chart=echarts.init(this.$refs.wrapper as HTMLDivElement)
      this.chart.setOption(this.option)
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  height: 300px;
}
</style>