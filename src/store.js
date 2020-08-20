'use strict';
import api from './api'


let store = {
  bookmarks: [],
  adding: false,
  expanded: false,
  error: null,
  filter: 0
};

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

function toggleBookmarkExpand(id) {
  const bookmark = this.findById(id);
  bookmark.expanded = !bookmark.expanded
}

// let bookmark = store.bookmark

function addToStore(item){
  store.bookmarks.push(item)
  //console.log(store.bookmarks)

}

export default {
  addToStore,
  store,
  findById,
  toggleBookmarkExpand
}