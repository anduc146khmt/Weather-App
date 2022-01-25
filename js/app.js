const inputToggle = document.querySelector('#toggleMode');
const weatherContent = document.querySelector('.weather__content');
inputToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    if(inputToggle.checked) {
        weatherContent.classList.add('darkWeather');
        weatherContent.classList.remove('hotWeather');
    }
    else {
        weatherContent.classList.add('hotWeather');
        weatherContent.classList.remove('darkWeather');
    }
});
var weatherSearch = document.querySelector('.search');
var weatherCity = document.querySelector('.city');
var weatherCountry = document.querySelector('.country');
var weatherTime = document.querySelector('.time');
var weatherTemperature = document.querySelector('.temperature');
var weatherMode = document.querySelector('.weather__mode h3');
var weatherVisibility = document.querySelector('.visibility p');
var weatherWind = document.querySelector('.wind p');
var weatherSun = document.querySelector('.sun p');
weatherTime.innerHTML = new Date().toLocaleString('vi');
weatherSearch.addEventListener('keyup', function(e){
    if(e.keyCode === 13) {
        let dataSearch = weatherSearch.value.trim();
        var HCM_name = ['TPHCM', 'HCM', 'Ho', 'Chi', 'Minh', 'TpHCM', 'Hcm', 'HCm', 'hcm'];
        var isHCM = HCM_name.some(function(keyname) {
            return dataSearch.search(keyname) != -1;
        });
        if(isHCM) dataSearch = 'Ho Chi Minh';
        if(dataSearch === 'US') dataSearch = 'America';
        if(dataSearch === 'UK') dataSearch = 'England';
        if(dataSearch === 'Ho Chi Minh') {
            weatherContent.style.height = '530px';
        }
        else {
            weatherContent.style.height = '510px';
        }
        changeWeatherUI(dataSearch);
    }
});
async function changeWeatherUI(dataSearch) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${dataSearch}&appid=e0b2f03f82ab178e8cf8d127b5389915`;
    let data = await fetch(apiURL).then(res=> res.json());
    if(data.cod == 200) {
        console.log(data);
        weatherCity.innerHTML = data.name;
        if(data.name === 'Turan') weatherCity.innerHTML = 'Da Nang';
        weatherCountry.innerHTML = data.sys.country;
        let degree = Math.floor(data.main.temp - 273.15);
        weatherTemperature.innerHTML = `<p>${degree}<sup>o</sup>C</p>`;
        weatherMode.innerHTML = data.weather[0].main;
        weatherVisibility.innerHTML = data.visibility + ' (m)';
        weatherWind.innerHTML = data.wind.speed + ' (m/s)';
        weatherSun.innerHTML = data.main.humidity + ' (%)';
        if(degree < 20) {
            document.body.classList.add('dark');
            document.body.classList.remove('hot');
            weatherContent.classList.add('darkWeather');
            weatherContent.classList.remove('hotWeather');
            inputToggle.checked = true;
        }
        else {
            document.body.classList.add('hot');
            document.body.classList.remove('dark');
            weatherContent.classList.add('hotWeather');
            weatherContent.classList.remove('darkWeather');
            inputToggle.checked = false;
        }
    }
    else {
        alert('Data weather is not found. Please try again!');
    }
}