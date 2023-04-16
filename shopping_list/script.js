
const inputItem = document.getElementById('item-input') 
const itemForm = document.getElementById('item-form')  
const itemList = document.getElementById('item-list')
const clearButton = document.getElementById('clear')
const filterItem = document.querySelector('.filter')




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

function addItem(e){
    e.preventDefault()

    // validation
    if (inputItem.value === ''){
        alert('Please add item');
        return;
    }

    // Add an item
    const li = document.createElement('li')

    // add the item name
    li.appendChild(document.createTextNode(inputItem.value))
    
    // add a button 
    button = createButton('remove-item btn-link text-red')
    li.appendChild(button)


    // append the item to the list
    itemList.appendChild(li)
    
    resetUI();

    
}

function removeItem(e){
    // Check if the remove icon was clicked
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove()
            resetUI();
        }
        
    }
}

function removeAllItems(){
    while(itemList.firstChild){
        itemList.firstChild.remove()
    }
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
}

window.addEventListener('load', (e) => {
    resetUI();
});


itemForm.addEventListener('submit', addItem);   
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAllItems)