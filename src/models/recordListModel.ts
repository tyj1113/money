const localStorageName='recordList'
const recordListModel={
  save(newRecord: RecordItem[]){
    window.localStorage.setItem(localStorageName, JSON.stringify(newRecord));
  },
  fetch(){
    return JSON.parse(window.localStorage.getItem(localStorageName) || '[]')
  },
  clone(old: RecordItem){
    return JSON.parse(JSON.stringify(old));
  }
}
export default recordListModel