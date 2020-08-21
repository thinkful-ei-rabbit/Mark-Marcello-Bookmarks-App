'use strict';


let baseUrl = 'https://thinkful-list-api.herokuapp.com/Mark/bookmarks';


// Performs the first promise sequence for CRUD
function fetcher(...args){
  let error;
  return fetch(...args)
  .then(res => {
    if (!res.ok){
      error= { code: res.status };
    }
    return res.json();
  })
  .then(data => {
    if (error) {
      error.message = data.message;
      return Promise.reject(error);
    }
    return data;
  })
}

// GET fetch
function getBookmarks() {
  return fetcher(`${baseUrl}`)
  
}

// POST fetch
function createBookMark(title, url, desc, rating){
  let newItem = JSON.stringify({
     title: title,
     url: url,
     desc: desc,
     rating: rating 
  })
  return fetcher(`${baseUrl}`, {
    method: "POST",
      headers: {"Content-Type": "application/json"},
      body: newItem
  })
  
}
// DELETE fetch
function deleteBookmarks(id){
  return fetcher(`${baseUrl}/${id}`, {
    method: "DELETE"
  })
};
// PATCH fetch for all values
function updateBookmark(id, title, url, desc, rating){
  let newItem = JSON.stringify({
    title: title,
    url: url,
    desc: desc,
    rating: rating 
 })
 return fetcher(`${baseUrl}/${id}`, {
  method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: newItem
})

}

export default{
  getBookmarks,
  createBookMark,
  deleteBookmarks,
  updateBookmark
}