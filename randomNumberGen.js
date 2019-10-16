document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#randomNum')
    const bodyDiv = document.querySelector('#body')
    
    button.addEventListener('click', () => {
        if (bodyDiv.innerText === ''){
            fetchData()
        } else if (bodyDiv.innerText !== ''){
            bodyDiv.innerText = ''
            fetchData()
        }
    })
})

const fetchData = async () => {
    const bodyDiv = document.querySelector('#body')
    const createHeading = document.createElement('h3')
    const createText =  document.createElement('p')

    const numberOne = document.querySelector('#number-one').value
    const numberTwo = document.querySelector('#number-two').value

    let response = await axios.get(`http://localhost:5000/random?ceil=${numberOne}&floor=${numberTwo}`)
    let randomNum = response.data.randomPick
    console.log(response.data)
    
    if (numberOne < numberTwo){
        createHeading.innerText = `${response.data.status}`
    } else if (numberOne >= numberTwo){
        createHeading.innerText = 'The Random Number is:'
        createText.innerText = `${randomNum}`      
    }  
    bodyDiv.append(createHeading, createText)
}

