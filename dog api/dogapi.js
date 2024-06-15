// select relevant element
const BREED_SELECT = document.querySelector('#breed')
const REFRESH_BTN = document.querySelector('button')
const IMG = document.querySelector('.main-image')
const DOG_ICON = document.querySelector('#loader')

// Breed type
let breedType = ""

const RANDOM_IMG = "https://dog.ceo/api/breeds/image/random"
const BREED_LIST = "https://dog.ceo/api/breeds/list/all"

async function init(){
    const res = await fetch(BREED_LIST)
    const data = await res.json()

    let breedList = Object.keys(data.message)
    let breedOptions = `<options value="">pick a breed...</options>`
    for (let i = 0; i < breedList.length; i++) {
        breedOptions += `<option value=${breedList[i]}>${breedList[i]}</option>`
    }
    BREED_SELECT.innerHTML = breedOptions
    // Get first image
    const randomImageRes = await fetch(RANDOM_IMG)
    const randomImageData = await randomImageRes.json()
    IMG.src = randomImageData.message
    IMG.addEventListener("load", function(){
        IMG.classList.add("show")
        DOG_ICON.classList.remove("show")
    })
}
async function handleBreedChnage(event) {
    const VAL = event.target.value
    if (VAL) {
        breedType = VAL
        IMG.classList.remove("show")
        DOG_ICON.classList.add("show")

        const res = await fetch
    }
}
init()