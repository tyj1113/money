import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] ,
    tagList: [] ,
    selectedTag: '',
    createTagError:null,
    createRecordError:null,
    allTag:['caipiao','clothes','cosmetics','dian','dianfei','dianqi','eat','feiji',
      'fenhong','gift','gongzi','hongbao','huwai','jiaju','jiangjin','jianzhi',
      'jiudian','licai','lvxing','lvyou','maicai','member','movie','pets','phonebill',
      'rent','riyongpin','seedoctor','shopping','shuifei','shuma','snacks','traffic',
      'waimai','wine','youxi','yuehui']
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
        store.commit('createTag',{tagName:'衣',iconName:'clothes'})
        store.commit('createTag',{tagName:'食',iconName:'eat'})
        store.commit('createTag',{tagName:'住',iconName:'rent'})
        store.commit('createTag',{tagName:'行',iconName:'huwai'})
      }
    },
    createTag(state, {tagName,iconName}) {
      state.createTagError=null
      const tagsName = state.tagList.map(item => item.tagName);
      if (tagsName.includes(tagName)) {
        state.createTagError=new Error('标签名重复了')
        return
      } else {
        const id = createId().toString();
        state.tagList.push({id,tagName,iconName});
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
      } else {
        window.alert('删除失败');
      }
    },
    updateTagName(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const index = state.tagList.findIndex(item => item.id === id);
      if (index !== -1) {
        const names=state.tagList.map(item=>item.tagName)
        if(names.find(item=> item===name)){
          window.alert('标签名重复了')
        }else{
          state.tagList[index].tagName = name;
          store.commit('saveTags');
        }
      } else {
        window.alert('not found');
      }
    },
    selectedTagUpdate(state, tag) {
      state.selectedTag = tag;
    },
    selectedTagClear(state) {
      state.selectedTag = '';
    }
  },
  actions: {},
  modules: {}
});
export default store;