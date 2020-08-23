'use strict';
import $ from 'jquery';
import store from './store'
import api from './api'



// Holds the html for collapsed view
function addHtml(item){
  
  if (item.rating >= store.store.filter ){

    return `<li class="element" data-item-id="${item.id}">
    <div class = 'list'>
      <div class = 'item'>
        ${item.title}
      </div>
      <div class = 'item'>  
        ⭐${item.rating}⭐
     </div>
    </div>
    </li>`

  }



}

// Holds html for expanded view
function addHtmlExpanded(item){
  if (item.rating >= store.store.filter ){
    return `<li class="element" data-item-id="${item.id}">
    <div class = 'list'>
      <div class = 'item'>
        ${item.title}
      </div>
      <div class = 'item'>  
        ⭐${item.rating}⭐
     </div>
     <div class = 'expand'>
      ${item.desc} 
      <a class = 'button' href='${item.url}';"}'>Link</a>
      <button class = 'edit'>Edit</button>
      <button class = 'delete'>Delete</button>
      
     </div>
    </div>
    </li>`

  }
  
  
}
// Holds html for the add bookmark form
function addLinkHtml(){
  return `<form>
  <fieldset>
  <h3>Create a Bookmark</h3>
  <div class = 'all'>
    <div class = 'column'>
      <div class = 'row'>
        <input class= 'title' type="text" placeholder ='Title' name ='title'>
        <input class = 'link' type="text" placeholder = 'Link goes here'name ='link'>
      </div>
      <textarea id="description" placeholder = 'Description goes here.' name ='description'></textarea>
    </div>
    <div class = 'radio'>
      <input type="radio" name="rating" id="5stars" value = 5/>
      <label for="5stars">5 Stars! ⭐⭐⭐⭐⭐</label>
      <input type="radio" name="rating" id="4stars" value = 4/>
      <label for="4stars">4 Stars! ⭐⭐⭐⭐✰</label>
      <input type="radio" name="rating" id="3stars" value = 3/>
      <label for="3stars">3 Stars! ⭐⭐⭐✰✰</label>
      <input type="radio" name="rating" id="2stars" value = 2/>
      <label for="2stars">2 Stars!⭐⭐✰✰✰</label>
      <input type="radio" name="rating" id="1star" value = 1/>
      <label for="1star">1 Star! ⭐✰✰✰✰</label>
    </div>
  </div>
  <button class ='create'>Create</button>
  <button class = 'cancel'>Cancel</button>
  </fieldset>
  </form>`
}

// Holds html for the edit bookmark feature
function editValues(item){
  
return `<li class="element" data-item-id="${item.id}">
<div class = 'list'>
  <div class = 'item'>
  <label for ='changeName'>Edit the Title!</label>  
  <input id = 'changeName' class ='changeName' type = 'text' value = "${item.title}">
    
    </div>
  <div class = 'item'>  
  <label for ='changeRating'>⭐How many stars?⭐</label>
  <input id ='changeRating' class = 'changeRating' type = 'text' value = '${item.rating}'>
  
 </div>
 <div class = 'expands'>
 <label for = 'newDesc'>Change the Description?</label> 
 <textarea type = 'text' id = 'newDesc'>${item.desc}</textarea>
  
  <label for ='newLink'>New Link?</label>
  <input id ='newLink' type = 'text' value = '${item.url}' class = 'changeUrl'>
  
  <button class = 'changeVals'>Submit Changes</button>
  <button class = 'delete'>Delete</button>
 </div>
</div>
</li>`
}


// Puts bookmarks into a string for easier display
function generateBookmarkString(bookmarks){
  const items = bookmarks.map((item) => addHtml(item));
  return items.join('');
}
// Render function which reloads the page to display correct data
function render(){
  
  let info = store.store
  if (info.error !== null){
    functionAlert(info.error)
    store.clearError

  }  else {
    if (info.adding === false){
      let items = [...store.store.bookmarks] 
      if(info.expanded !== null) {
        const htmlString = store.store.bookmarks.map( function (val){
       if (val.id === store.store.expanded){
        if(info.editing === false){
          return addHtmlExpanded(val)
        } else {
          return editValues(val)
        }
            
       } else {
      
        return addHtml(val)
       }
      })
       $('ul').html( htmlString );
  
      } else {
        const addBookmarks = generateBookmarkString(items)
        $('ul').html(addBookmarks)
      }
  
    } else {
  
      let entryForm = addLinkHtml()
      $('div.home').html(entryForm)
      let items = [...store.store.bookmarks] 
      const addBookmarks = generateBookmarkString(items);
      $('ul').html(addBookmarks)
    }
    
  }
  

  
}

// Function to open the add bookmark form
function openAdd (){
  $('main').on('click', 'button.new', function (){
    store.toggleAdding();
    render()
  })
}
// Function that creates a custom alertbox for missing requirements
function functionAlert(msg) {
  let confirmBox = $("#confirm");
  confirmBox.find(".message").text(msg);
  confirmBox.find(".yes").unbind().click(function() {
     confirmBox.hide();
  });
  confirmBox.show();
}

// Function that adds the new bookmark to DB and local store
function addLink(){
  $('main').on('click', 'button.create', function (event){
    event.preventDefault();
    let title = $('input.title').val();
    let link = $('input.link').val();
    let description = $('#description').val();
    let rating = $('input[name=rating]:checked').val();
    if (!title || typeof title !== typeof '' ){
      functionAlert('You need a title' )
    } else if (!link.includes('http')|| link.length < 5 ) {
      functionAlert('Please use a valid link with http or https protocol. . . You Dummy!' )
    } else if (description.length < 1){
      functionAlert(`Atleast add something to the description. . . Don't be that guy!`)      
    } else if(!rating){
      functionAlert('Please Choose a rating, This mui importante!')
    } else {
      api.createBookMark(title, link, description, rating)
      .then(newItem => {
        store.addToStore(newItem)
        render()
      })
      .catch((error) =>{
        store.setError(error.message)
        render()
      })

    }
    

    

  })
}

// Function to close out the add bookmark form
function cancelMenu(){
  $('main').on('click', 'button.cancel', function (){
    store.toggleAdding()
    render();

  })
}

// Function for setting the expand value to the current bookmark ID
function expandView(){
  $('main').on('click', 'li', function (event){
  if( store.store.editing === false ){
    const id = getItemIdFromElement(event.currentTarget)
    store.toggleExpand(id);
    render()
  }

  })
}

// Returns the closest bookmark
const getItemFromElement = function (item){
  return $(item)
  .closest('.element')
}

// Returns the closest bookmark.id
const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.element')
    .data('item-id');
};

// function that deletes the bookmark from DB and local store
function deleteItem(){
  $('main').on('click', 'button.delete', function (event){
    const id = getItemIdFromElement(event.currentTarget)
    if(store.store.editing === true){
      store.toggleEdit()
    }
    api.deleteBookmarks(id)
    .then(() => {
      store.findAndDelete(id)
      render();
    }) 
      .catch((error) =>{
      store.setError(error.message)
      render()
    })
  });
}
// Function that sets the filter rating to show whats displayed
function setRatingFilter(){
  $('main').on('click', '.select', function (){
    let rating = $('option:selected').val();
    store.toggleRating(rating)
    render();
  })
  render();
}

// Function to open edit mode on any bookmark
function openEdit(){
  $('main').on('click', '.edit', function (event){
    event.preventDefault();
    store.toggleEdit();
    const id = getItemFromElement(event.currentTarget)
    render()
    
  })
}

// Function to edit any bookmark values while in edit mode
function editValue(){
  $('main').on('click', 'button.changeVals', function (event){
    let title = $('input.changeName').val();
    let link = $('input.changeUrl').val();
    let description = $('#newDesc').val();
    let rating = $('input.changeRating').val();
    const id = getItemIdFromElement(event.currentTarget)
    console.log(title)
    if (title.length < 1  ){
      functionAlert('You Need a Title Dummy!')
    } else if (!link.includes('http')|| link.length < 5 ) {
      functionAlert('Please use a valid link with http or https protocol. . . You Dummy!')
    } else if (description.length < 1){
      functionAlert(`Atleast add something to the description. . . Don't be that guy!`)
    } else if(!rating || rating <= 0 || rating > 5 ){
      functionAlert('Please Choose a rating, This mui importante! THIS MUST BE BETWEEN 1 and 5!')
    } else{

      api.updateBookmark(id, title, link, description, rating)
      .then(() => {
        store.findAndUpdate(id, {title:title, url: link, desc: description, rating: rating })
        render();
      })
      .catch((error) =>{
      store.setError(error.message)
      render()
      })
    store.toggleEdit();
    render()    
   }
  })
}

//function to bind all event handlers
function eventHandlers(){
  openAdd();
  addLink();
  cancelMenu();
  deleteItem();
  setRatingFilter();
  openEdit();
  expandView();
  editValue();
}
 
export default{
  render,
  eventHandlers
}