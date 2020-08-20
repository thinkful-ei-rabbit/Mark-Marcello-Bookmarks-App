'use strict';
import $ from 'jquery';
import store from './store'
import api from './api'


function addHtml(item){
  
  return `<li>
<div class = 'list'>
  <div class = 'item'>
    <section><p>${item.title}</p></section>
  </div>
  <div class = 'item'>  
    <section><p>${item.rating}</p></section>
 </div>
</div>
</li>`

}

function addLinkHtml(){
  return `<form>
  <h3>Create a Bookmark</h3>
  <div class = 'all'>
    <div class = 'column'>
      <div class = 'row'>
        <input class= 'title' type="text" placeholder ='Title' name ='title'>
        <input class = 'link' type="text" placeholder = 'Link goes here'name ='link'>
      </div>
      <textarea id="description" cols="30" rows="10" placeholder = 'Description goes here.' name ='description'></textarea>
    </div>
    <div class = 'radio'>
      <input type="radio" name="rating" id="5stars" value = 5>
      <label for="5stars">5 Stars!</label>
      <input type="radio" name="rating" id="4stars" value = 4 >
      <label for="4stars">4 Stars!</label>
      <input type="radio" name="rating" id="3stars" value = 3>
      <label for="3stars">3 Stars!</label>
      <input type="radio" name="rating" id="2stars" value = 2>
      <label for="2stars">2 Stars!</label>
      <input type="radio" name="rating" id="1star" value = 1>
      <label for="1star">1 Star!</label>
    </div>
  </div>
  <button class ='create'>Create</button>
  <button class = 'cancel'>Cancel</button>
  </form>`
}

function addHomeGrp(){
  return `<div class = 'home'>
  <button class = 'new'>Add Bookmark</button>
  <select name="minimum-rating" size= '1'>
    <option value="" disable selected hidden>Minimum Rating</option>
    <option value="5stars">5 Stars</option>
    <option value="4stars">4 Stars</option>
    <option value="3stars">3 Stars</option>
    <option value="2stars">2 Stars</option>
    <option value="1star">1 Star</option>
  </select>
</div>`
}

function addExpand(){
  return `<div class ='expand'>
  <h3>Title 1</h3>
  <p>This is a Description about the Title 1 link, This explains more details about the site!</p>
  <button class ='visit site'>Visit Site!</button>
  <p>Rating here! (1 - 5 Stars)</p>
</div>`
}


function generateBookmarkString(bookmarks){
  //console.log(bookmarks)
  const items = bookmarks.map((item) => addHtml(item));
  return items.join('');
}

function render(){
  let items = [...store.store.bookmarks]
  
  const addBookmarks = generateBookmarkString(items);
  $('ul').html(addBookmarks)
  
}


function openAdd (){
  $('main').on('click', 'button.new', function (event){
    let menu = addLinkHtml()

    $('div.home').html(menu)
    render()
  })
}


function addLink(){
  $('main').on('click', 'button.create', function (event){
    event.preventDefault();
    let title = $('input.title').val();
    let link = $('input.link').val();
    let description = $('#description').val();
    let rating = $('input[name=rating]:checked').val();
    //console.log(rating)
    api.createBookMark(title, link, description, rating)
    .then(newItem => {
      store.addToStore(newItem)
    })
    render()

  })
}

function cancelMenu(){
  $('main').on('click', 'button.cancel', function (event){
    event.preventDefault();
    let cancel = addHomeGrp();
    $('form').html(cancel)
    render();

  })
}

function openDialog(){
  $('main').on('click', 'li', function (event){
    event.preventDefault();
    let expand = addExpand();
    $('li').html(expand);
    render();
  })
}


function eventHandlers(){
  openAdd();
  addLink();
  cancelMenu();
  openDialog();
}
 
export default{
  //addHtml,
  render,
  eventHandlers
}