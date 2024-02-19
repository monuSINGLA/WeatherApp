const inputBox = document.querySelector(".input-box");
const searchButton = document.getElementById("btn");
const weatherImage = document.querySelector(".weather-image")
const temprature = document.querySelector(".temperature");
const discription = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const locationNotFound = document.querySelector(".location-not-found")
const weatherBody = document.querySelector(".weather-body")

window.addEventListener("load", function () {
    inputBox.focus();
});
const checkWeather = async function (location) {
    const apiKey = "c5deec7bb1365441287f78adeac6839b"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    try {
        const weather_data = await fetch(url)
            .then(response => response.json())

        if (weather_data.cod === "404") {
            locationNotFound.style.display = "flex"
            weatherBody.style.display = "none"
            return;



        }
        locationNotFound.style.display = "none"
        weatherBody.style.display = "flex"

        temprature.textContent = `${Math.round(weather_data.main.temp)}°C`;
        discription.textContent = weather_data.name;
        humidity.textContent = `${weather_data.main.humidity}%`;
        windSpeed.textContent = `${weather_data.wind.speed}Km/H`
        console.log(weather_data)
        console.log(weather_data.name)

        switch (weather_data.weather[0].main) {
            case "Clouds":
                weatherImage.src = "./Assets/cloud.png";
                break;
            case "Rain":
                weatherImage.src = "./Assets/rain.png";
                break;
            case "Mist":
                weatherImage.src = "./Assets/mist.png";
                break;
            case "Snow":
                weatherImage.src = "./Assets/snow.png";
                break;
            case "Clear":
                weatherImage.src = "./Assets/clear.png";
                break;

        }
    } catch (error) {
        console.error(error)
    }
}

searchButton.addEventListener("click", () => {
    if (inputBox.value) {
        checkWeather(inputBox.value);
    } else {
        alert("Please Enter Location")
    }

})


inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (inputBox.value) {
            checkWeather(inputBox.value)
        } else {
            alert("Please Enter Location")
        }


    }
})





