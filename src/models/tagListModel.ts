import createId from '@/lib/createId';

const localStorageName = 'tagList';
type Tag={
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  save: () => void;
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
}
const tagListModel: TagListModel = {
  data: [],
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
  },
  create(name) {
    const tags=this.data.map(item=> item.name)
    if(tags.includes(name))return 'duplicated'
    const id=createId().toString()
    this.data.push({id,name});
    this.save();
    return 'success';
  }
};
export default tagListModel;