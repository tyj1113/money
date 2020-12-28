import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList:[] as Tag[]
  },
  mutations: {
    fetchRecords(state){
      state.recordList= JSON.parse(window.localStorage.getItem('recordList') || '[]')
      console.log(state.recordList)
    },
    saveRecords(state,record){
      const newRecord: RecordItem =clone(record);
      newRecord.createAt = new Date();
      state.recordList.push(newRecord);
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
})
