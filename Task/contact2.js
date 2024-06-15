const URL = "https://jsonplaceholder.typicode.com/users"

const tbody = document.querySelector("tbody")

const promise = fetch(URL)
promise
.then(function (response){
    const processedResponse = response.json()
    console.log(processedResponse)
    return processedResponse
})
.then(function (data){
    for(let i =0; i< data.length; i++) {
        let mock = `<tr>
        <td>Full Name:${data[i].name}</td>
        <td>Username: ${data[i].username}</td>
        <td>Phone: ${data[i].phone}</td>
    </tr>`
    tbody.innerHTML += mock
    }
})