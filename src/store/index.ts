import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    selectTags: []
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    saveRecords(state, record) {
      const newRecord: RecordItem = clone(record);
      newRecord.createAt = new Date();
      state.recordList.push(newRecord);
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name) {
      const tags = state.tagList.map(item => item.name);
      if (tags.includes(name)) {
        window.alert('标签名重复了');
      } else {
        const id = createId().toString();
        state.tagList.push({id, name});
        store.commit('saveTags');
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    removeTags(state, tag) {
      const index = state.tagList.findIndex(item => item === tag);
      if (index !== -1) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除成功');
        router.replace('/labels');
      } else {
        window.alert('删除失败');
      }
    },
    updateTagName(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const index = state.tagList.findIndex(item => item.id === id);
      if (index !== -1) {
        const names=state.tagList.map(item=>item.name)
        if(names.find(item=> item===name)){
          window.alert('标签名重复了')
        }else{
          state.tagList[index].name = name;
          store.commit('saveTags');
        }
      } else {
        window.alert('not found');
      }
    },
    selectedTagsUpdate(state, tags) {
      state.selectTags = tags;
    }
  },
  actions: {},
  modules: {}
});
export default store;