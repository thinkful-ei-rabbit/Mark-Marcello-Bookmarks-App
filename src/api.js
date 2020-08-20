'use strict';


let baseUrl = 'https://thinkful-list-api.herokuapp.com/Mark/bookmarks';



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


function getBookmarks() {
  return fetcher(`${baseUrl}`)
  

}


function createBookMark(title, url, desc, rating){
  let newItem = JSON.stringify({
     //id: cuid(),
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



export default{
  getBookmarks,
  //fetcher,
  createBookMark
}