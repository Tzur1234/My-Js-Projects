const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const spinner = document.querySelector('.spinner')

function showSpinner(){
  spinner.classList.remove('hidden')
}

function hideSpinner(){
  spinner.classList.add('hidden')
}

const getTodos = () => {
  // fetch data 
  fetch( apiUrl + '?_limit=5')
  .then(res => res.json())
  .then(todos => {
    todos.forEach(todo =>{
      addTODom(todo)
    });
  });

}

const addTODom = (todo) => {

  // Create a div element
  div = document.createElement('div')
  div.className = 'todo'
  if (todo.completed){
    div.classList.add('done')
  }
  div.setAttribute('data-id', todo.id)
  div.appendChild(document.createTextNode(todo.title))
  
  // append to the dom
  document.getElementById('todo-list').appendChild(div)
}

const addTodoDB = (e) => {
  e.preventDefault()

  const title = document.getElementById('title').value

  // POST request
  fetch(apiUrl , {
    method: 'POST',
    body:JSON.stringify({'title':title, 'completed' : false}) ,
    headers: {
      'Content-type': 'applicatin/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    addTODom({'id':201, 'title': title, 'completed':true})
  })
  .catch((error) => console.log( error));
}

const updateStatusDB = (set_status, id) => {
  return fetch(`${apiUrl}/${id}`, {
    method:'PUT',
    body:JSON.stringify({
              id:id,
              completed:set_status
            }),
    headers:{
      'Content-type':'application/json'
    }       
  })
  .then(res => res.json())
  .then(data => {
    console.log('finish updating', data)

  })
  .catch(error => console.log('something went wrong: ', error))

}

const updateState = (e) => {
  if(e.target.classList.contains('todo')){
    
    if(e.target.classList.contains('done')){
      showSpinner()

      // update DB
      updateStatusDB(false, e.target.dataset.id)
      .then(() => {
        // update DOM
        e.target.classList.remove('done')        
        hideSpinner()
       });

    }
    else{
      showSpinner()
      
      // update DB
     updateStatusDB(true, e.target.dataset.id)
     .then(() => {
      // update DOM
      e.target.classList.add('done')
      
      hideSpinner()
     });
    }
  }
}

window.addEventListener('load', getTodos)
document.querySelector('button').addEventListener('click', addTodoDB)

document.getElementById('todo-list').addEventListener('click', updateState)

// add evetn Listener when press a todo

// create a function: UpdateStatus
// check the class of the element
// 1. update the todo inDB
// 2. Update the todo inDOM color (by adding/removing done class to the div element)




