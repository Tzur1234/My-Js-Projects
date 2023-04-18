
function fetchUser(){
  showSpinner()
  fetch('https://randomuser.me/api/')
  .then((res) => {
    if(res.status === 404){
      throw new Error('Response 404')
    }
    return res.json()
  })
  .then((data) => {
    hideSpinner()
    displayUser(data.results[0])
  })
  .catch(error => {
    hideSpinner()
    document.querySelector('#user').innerHTML = `<p class="text-xl text-center text-red-500 mb-5">${error}</p>`
  });
}


function displayUser(user){
  if(user.gender === 'male'){
    document.body.style.backgroundColor = '#4C62FF'
  }
  else{
    document.body.style.backgroundColor = '#E52967' ; 
  }

  // insert data
  details = document.getElementById('user')

  console.log(user)

  details.innerHTML = `
                      <div class="flex justify-between">
                      <div class="flex">
                        <img
                          class="w-48 h-48 rounded-full mr-8"
                          src="${user.picture.large}"
                        />
                        <div class="space-y-3">
                          <p class="text-xl">
                            <span class="font-bold">Name: </span>
                            ${user.name.first} ${user.name.last}
                          </p>
                          <p class="text-xl">
                            <span class="font-bold">Email: </span> ${user.email}
                          </p>
                          <p class="text-xl">
                            <span class="font-bold">Phone: </span> ${user.phone}
                          </p>
                          <p class="text-xl">
                            <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
                          </p>
                          <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
                        </div>
                      </div>
                    </div>`

                   
}

function showSpinner(){
  document.querySelector('.spinner').style.display = 'block'

}

function hideSpinner(){
  document.querySelector('.spinner').style.display = 'none'

}

button = document.getElementById('generate').addEventListener('click', fetchUser)

