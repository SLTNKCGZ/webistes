const wrapper=document.querySelector(".box"),
inputPart=wrapper.querySelector(".input-part"),
infoTxt=inputPart.querySelector(".info"),
inputField=inputPart.querySelector("input"),
wIcon=wrapper.querySelector(".weather-part img"),
showBtn=inputPart.querySelector(".show"),
locationBtn=inputPart.querySelector(".local"),
arrowBack=wrapper.querySelector(".head i")
let api;

inputField.addEventListener("keyup",e=>{
    if(e.key=="Enter" && inputField.value != ""){
        requestApi(inputField.value)
    }
})
locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        console.log("Geolocation desteklenmiyor...")
    }
}
)
showBtn.addEventListener("click",()=>{
    if(inputField.value != ""){
        requestApi(inputField.value)
    }
    else{
        infoTxt.innerText="Site ismi yok ya da yanlış!!!"
        infoTxt.classList.add("error") 
    }
})
function onSuccess(position){
    const {latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e12ac340b272210d32b6ed6a0e058076`;
    fecthData()
}
function onError(error){
    infoTxt.innerText=error.message
    infoTxt.classList.add("error")
}

function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e12ac340b272210d32b6ed6a0e058076`;
    fecthData()
}
function fecthData(){
    infoTxt.innerText="Sonuçlar Getiriliyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    if(info.cod=="404"){
        infoTxt.innerText="Şehir bulunamadı!!!"
        infoTxt.classList.replace("pending","error")
    }
    else{
        const city=info.name
        const country=info.sys.country
        const {description,id}=info.weather[0]
        const {feels_like,humidity,temp}=info.main
        if(id==800){
            wIcon.src="Assets/clear.svg"
        }
        else if(id=>200 && id <=232){
            wIcon.src="Assets/storm.svg"
        }
        else if(id=>600 && id <=622){
            wIcon.src="Assets/snow.svg"
        }
        else if(id=>701 && id <=781){
            wIcon.src="Assets/haze.svg"
        }
        else if(id=>801 && id <=804){
            wIcon.src="Assets/cloud.svg"
        }
        else if(id=>300 && id <=321 || (id=>500 && id <=531 )){
            wIcon.src="Assets/rain.svg"
        }
        wrapper.querySelector(".temp .numb").innerText=Math.round(temp)
        wrapper.querySelector(".weather").innerText=description.toUpperCase()
        wrapper.querySelector(".location span").innerText=`${city},${country}`
        wrapper.querySelector(".temp .numb-2").innerText=Math.round(feels_like)
        wrapper.querySelector(".humidity span").innerText=`${humidity}%`

        infoTxt.classList.remove("pending","error")
        wrapper.classList.add("active")
        
    }
    
}
arrowBack.addEventListener("click",() =>{
    wrapper.classList.remove("active")
})