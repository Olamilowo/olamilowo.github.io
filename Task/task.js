const URL = "https://random-data-api.com/api/v2/appliances"

const btn = document.querySelector("button")
const tbody = document.querySelector("tbody")

function fetchData(){
    const promise = fetch(URL)
    promise
    .then(function (response){
        const processedResponse = response.json()
        return processedResponse
    })
    .then(function (data) {
        let mock = `
        <tr>
        <td>${data.id}</td>
        <td>${data.brand}</td>
        <td>${data.equipment}</td>
        </tr>
        `
        tbody.innerHTML += mock 
    })
}
btn.addEventListener("click", fetchData)