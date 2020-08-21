import 'normalize.css';
import './index.css';
import api from './api'
import store from './store'
import query from './query'
import $ from 'jquery'


//Main Function Runs all functions and adds DB to local store
function main(){

  api.getBookmarks()
    .then(items => {
       items.forEach(function (item){
       store.addToStore(item)
    })
    query.render()
})
query.eventHandlers()

}

$(main)
