
const inputItem = document.getElementById('item-input') 
const itemForm = document.getElementById('item-form')  
const itemList = document.getElementById('item-list')
const clearButton = document.getElementById('clear')
const filterItem = document.getElementById('filter')
let isEditMode = false;
const formBtn = itemForm.querySelector('.btn') 


function removeItemFromArray(items, value){
    const index = items.indexOf(value)
    items.splice(index, 1)

}

function createButton(classes){
    button = document.createElement('button')
    button.className = classes
    
    // create icon 
    icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'

    // add the icon to the button 
    button.appendChild(icon)

    return button

}

function addItemToDom(item){
    
    let itemsDOM  = JSON.parse(localStorage.getItem('items'))

    // check if the DOM is empty
    if (itemsDOM == null){
        itemsDOM =[]
    }

    // add the new item to the list 
    itemsDOM.push(item)

    // setItem in localStorage
    localStorage.setItem('items', JSON.stringify(itemsDOM))
    
}

function addItem(e){
    e.preventDefault()

    // validation
    if (inputItem.value === ''){
        alert('Please add item');
        return;
    }

    // Check if the item already exsit
    itemsDOM = JSON.parse(localStorage.getItem('items'))
    itemsDOM.forEach((item) => {
        if(item.toLowerCase() === inputItem.value.toLowerCase()){
            alert('The value aleady exists')
            return;
        }
    });


    // Check for edit mode
    if(isEditMode){
        const itemToEdit = document.querySelector('.edit-mode')
        
        // remove iitem from the DOM
        items = JSON.parse(localStorage.getItem('items'))
        removeItemFromArray(items, itemToEdit.firstChild.textContent)
        localStorage.setItem('items', JSON.stringify(items))
        
        // remove Item from the UI
        itemToEdit.remove()

        // updat isEditMode to false
        isEditMode = false 

        // reset the UI 
        resetUI()
    }

    // add the item to the UI
    addItemUI(inputItem.value)

    // add Item to DOM
    addItemToDom(inputItem.value)

    inputItem.value = ''

    resetUI();


    
}

function addItemUI(item){
       // Create li element
       const li = document.createElement('li')

       // add the item name
       li.appendChild(document.createTextNode(item))
       
       // add a button 
       button = createButton('remove-item btn-link text-red')
       li.appendChild(button)
   
       // append the item to the list
       itemList.appendChild(li)
      

}



function setItemToEdit(item){
    items = document.querySelectorAll('li')
    items.forEach(i => {
        i.className = ''
    });
    
    isEditMode = true
    console.log(item)
    item.classList.add('edit-mode')
    formBtn.style.backgroundColor = '#228B22';
    inputItem.value = item.textContent
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item'


    
}

function removeItem(e){
    // Check if the remove icon was clicked
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure?')){
            // remove all items from LocalStorage
            items = JSON.parse(localStorage.getItem('items'))
            removeItemFromArray(items, e.target.parentElement.previousSibling.textContent)
            localStorage.setItem('items', JSON.stringify(items))

            // remove from UI
            e.target.parentElement.parentElement.remove()
            resetUI();
        }
        
    }
    else{
        setItemToEdit(e.target)
    }
}

function removeAllItems(){
    while(itemList.firstChild){
        itemList.firstChild.remove()
    }
    // remove all form local storage
    localStorage.setItem('items', JSON.stringify([]))
    
    resetUI();
}

function resetUI(){
    items = itemList.querySelectorAll('li')
    if(items.length === 0){
        filterItem.style.display = 'none'
        clearButton.style.display = 'none'
    }
    else {
        filterItem.style.display = 'block'
        clearButton.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>  Add Item'
    isEditMode = false;
}

window.addEventListener('load', (e) => {

    // show all items in the list
    itemsDOM = JSON.parse(localStorage.getItem('items'))
    if(itemsDOM != null){
        itemsDOM.forEach((item) => {
            console.log(item)
            addItemUI(item)
        });
    }
    resetUI();
});

function filter_Item(e){
    items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()
    
    // lop over all items
    items.forEach((item) =>{
        text_item = item.firstChild.textContent.toLowerCase()
        console.log(text_item)

        if (text_item.indexOf(text) != -1){
            item.style.display = 'flex'
        }
        else{
            item.style.display = 'none'
        }
    });
    
}



itemForm.addEventListener('submit', addItem);   
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAllItems)
filterItem.addEventListener('input', filter_Item)




