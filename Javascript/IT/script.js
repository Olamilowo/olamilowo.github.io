const DOG_URL ="https://dog.ceo/api/breeds/image/random"

const dog_btn = document.querySelector(".add-dog")

const dog_container = document.querySelector(".dogs")

function fetchDog() {
    const promise = fetch(DOG_URL)
    console.log(promise)

    promise
    .then(function(response) {
        console.log(response)
        const processedResponse = response.json()
        return processedResponse
    })
    .then(function (processedResponse){
        const img = document.createElement("img")
        img.src = processedResponse.message
        img.alt = "pic of a dog"
        dog_container.appendChild(img)
    })
}
dog_btn.addEventListener("click", fetchDog)