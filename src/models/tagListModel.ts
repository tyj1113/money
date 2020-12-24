import createId from '@/lib/createId';

const localStorageName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  save: () => void;
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  remove: (tag: Tag) => boolean;
  update: (id: string,name: string) => 'success' | 'not found';
}
const tagListModel: TagListModel = {
  data: [],
  update(id,name) {
  const index=this.data.findIndex(item=> item.id===id)
    if(index!==-1){
      this.data[index].name=name
      tagListModel.save()
      return 'success'
    }else{
      return 'not found';
    }
  },
  remove(tag) {
    const index = this.data.findIndex(item => item === tag);
    if (index !== -1) {
      this.data.splice(index, 1);
      tagListModel.save();
      return true
    }
    return false
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
  },
  create(name) {
    const tags = this.data.map(item => item.name);
    if (tags.includes(name)) return 'duplicated';
    const id = createId().toString();
    this.data.push({id, name});
    this.save();
    return 'success';
  }
};
export default tagListModel;