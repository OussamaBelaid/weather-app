console.log("app.js file from public runnig")



const weatherForm =  document.querySelector('form');
const searchValue = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent='';
weatherForm.addEventListener('submit',(e) => {
e.preventDefault();
var location = searchValue.value;
messageTwo.textContent = '';
// get the weather data from the server
fetch('/weather?adress='+location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageTwo.textContent = data.error;
        }else
        {
            messageOne.textContent =data.location;
            messageTwo.textContent =data.forecast;
        }
    })
})
})