type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt: string;
}
type Tag = {
  id: string;
  tagName: string;
  iconName: string;
}
type TagListModel = {
  data: Tag[];
  save: () => void;
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';
  remove: (tag: Tag) => boolean;
  update: (id: string,name: string) => 'success' | 'not found';
}
type RootState={
  recordList:  RecordItem[];
  tagList:  Tag[];
  selectedTag: string;
  createTagError: Error | null;
  createRecordError: Error | null;
  allTag: string [];
}