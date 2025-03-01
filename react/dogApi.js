
function fetchDogs(numOfDogs){
    return fetch("https://dog.ceo/api/breeds/image/random/" + numOfDogs)
        .then(r => r.json())
        .then(d => d.map(_d => d.message))
}



function wrapPromise(promise){

}
