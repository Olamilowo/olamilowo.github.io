const URL = "https://jsonplaceholder.typicode.com/users"

const body = document.querySelector("body")

const promise = fetch(URL)
promise
.then(function (response){
    const processedResponse = response.json()
    console.log(processedResponse)
    return processedResponse
})
.then(function (data){
    for(let i =0; i< data.length; i++) {
        let mock = `<div id="container">
        <div>Full Name:${data[i].name}</div>
        <div>Username: ${data[i].username}</div>
        <div>Phone: ${data[i].phone}</div>
    </div>`
    body.innerHTML += mock
    }
})