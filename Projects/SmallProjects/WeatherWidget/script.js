function displayData(data)
{
    const city = document.getElementById('cityName');
    const weatherCondition = document.getElementById('weather');
    const windSpeed = document.getElementById('wind');
    const humiditylevel = document.getElementById('humidity');
    const precipitation = document.getElementById('precipitation');
    const temparature = document.getElementById('temp');
    const time = document.getElementById('currentTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    if (city) city.textContent = data.name;
    if (temparature) temparature.textContent = `${Math.floor(data.main.temp)}°C`;
    if (windSpeed) windSpeed.textContent = `${data.wind.speed} km/h`;
    if (humiditylevel) humiditylevel.textContent = `${data.main.humidity}%`;
    if (weatherCondition) weatherCondition.textContent = data.weather[0].main;
    if (currentTime) time.textContent = currentTime;
}

function getLocation()
{
    const api_key = 'c7be8d9ac493a9ab63705a8279841a4f';
    if ("geolocation" in navigator) {
    // Geolocation is available
    navigator.geolocation.getCurrentPosition(
    (position) => {
      // Success callback
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
    (async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`);
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }
      const data = await response.json();
      displayData(data);
    })();
    },
    (error) => {
        handleLocationError(error);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
}
function handleLocationError(error)
{   
    switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
    }
}

getLocation();