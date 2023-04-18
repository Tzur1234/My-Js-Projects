// async function
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({name:'Jhon', age: 20})
        console.log('finish timeout')
    }, 1000); 
});

// function getPromise(){
//     const response = promise;
//     console.log(typeof(response))
//     console.log(response)
// }


async function getPromise(){
        const response = await promise;
        console.log(typeof(response))
        console.log(response)
}

function print(){
    console.log('second function done')
}
    
    
getPromise()

print()