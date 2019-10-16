document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form')
    form.addEventListener('submit', () => {
        event.preventDefault()
        checkAnimal()
    })
})

const checkAnimal = async () => {
    event.preventDefault()
    const animalInput = document.querySelector('#animal-input').value
    
    let response = await axios.get(`http://localhost:5000/animal/${animalInput}`)
    
    const mainDiv = document.querySelector('#body')
    const createAnimalHead = document.createElement('h3')
    const createAnimalPara = document.createElement('p') 

    if (response.data.status === 'success'){
        mainDiv.innerHTML = ''
        createAnimalHead.innerText = animalInput
        mainDiv.appendChild(createAnimalHead)
        createAnimalPara.innerText = `The ${animalInput} is in our database. It is a dope animal because reasons.`
        mainDiv.appendChild(createAnimalPara)
    } else if (response.data.status === 'failed'){
        mainDiv.innerHTML = ''
        createAnimalPara.innerText = `The ${animalInput} is not in our database for some reason. We are working on updating our records. Have some patience.`
        mainDiv.appendChild(createAnimalPara)
    }
    animalInput.value = ' '
}

    


