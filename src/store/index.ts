import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] ,
    tagList: [] ,
    selectedTags: [],
    createTagError:null,
    createRecordError:null,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    saveRecords(state, record) {
      const newRecord: RecordItem = clone(record);
      newRecord.createAt = newRecord.createAt|| new Date().toISOString();
      state.recordList.push(newRecord);
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(state.tagList.length===0){
        store.commit('createTag','衣')
        store.commit('createTag','食')
        store.commit('createTag','住')
        store.commit('createTag','行')
      }
    },
    createTag(state, name) {
      state.createTagError=null
      const tags = state.tagList.map(item => item.name);
      if (tags.includes(name)) {
        state.createTagError=new Error('标签名重复了')
        return
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
      state.selectedTags = tags;
    },
    selectedTagsClear(state) {
      state.selectedTags = [];
    }
  },
  actions: {},
  modules: {}
});
export default store;