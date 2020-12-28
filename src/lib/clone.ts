function clone(old: RecordItem){
  return JSON.parse(JSON.stringify(old));
}
export default clone