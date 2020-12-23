let id: number = parseInt(window.localStorage.getItem('maxId') || '0');

function createId() {
  id++;
  window.localStorage.setItem('maxId',id.toString())
  return id;
}

export default createId;