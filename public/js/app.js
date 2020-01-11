console.log("javascript conneted")

const weather = document.querySelector('form')
const address = document.querySelector('input')
const loc = document.querySelector('.location')
const fore = document.querySelector('.forecast')

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = address.value
    loc.textContent='Fetching you weather...'
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            loc.textContent=data.error
            fore.textContent=''
        }
        else{
            loc.textContent=data.location
            fore.textContent=data.forecast
        }
    })
})
})