'use strict';


// Local store object
let store = {
  bookmarks: [],
  adding: false,
  error: false,
  filter: 0,
  editing: false,
  expanded: null
};

// Function to toggle error
function addError(){
  if (store.error === false){
    store.error = true
  } else{
    store.error = false
  }
}

// function to toggle adding mode
function toggleAdding(){
  if (store.adding === false){
    store.adding = true
  } else {
    store.adding = false
  }
}
// Function to set rating value 
function toggleRating(val){
  store.filter = val
}

// Function to add bookmarks to local store
function addToStore(item){
  store.bookmarks.push(item)
}

// Function to delete bookmarks from the local store
const findAndDelete = function (id) {
  this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id)
};

// Function to toggle editing mode
function toggleEdit(){
  if (store.editing === false){
    store.editing = true
  } else {
    store.editing = false
  }
}
// Function to toggle exanded
function toggleExpand(val){
  store.expanded = val
}

// Function to find and update data inside the local store
function findAndUpdate(id, newData){
  let item = this.store.bookmarks.find(element => element['id'] === id);
  Object.assign(item, newData);
}

export default {
  addToStore,
  store,
  findAndDelete,
  addError,
  toggleAdding,
  toggleRating,
  toggleEdit,
  toggleExpand,
  findAndUpdate
}