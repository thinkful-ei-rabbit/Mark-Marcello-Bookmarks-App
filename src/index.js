import 'normalize.css';
import './index.css';
import api from './api'
import store from './store'
import query from './query'
import $ from 'jquery'



function main(){
api.getBookmarks()
.then(items => {
  console.log(items)
  items.forEach(function (item){
    store.addToStore(item)
  })
  query.render()
})
query.eventHandlers()
// let google = 'google'
// let url = 'https://www.google.com'
// let desc = 'A search engine'
// let val = 5
// api.createBookMark(google, url, desc, val)
// .then(newItem => {
//   store.addToStore(newItem)
// })
// query.render()
}

$(main)