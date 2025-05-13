window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
      document.getElementById("location").textContent = "Geolocation not supported.";
    }
  };
  
  function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  
    fetch(`/weather?lat=${lat}&lon=${lon}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("location").textContent = `Location: ${data.name}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
      })
      .catch(() => {
        document.getElementById("location").textContent = "Weather fetch failed.";
      });
  }
  
  function showError(error) {
    document.getElementById("location").textContent = "Error fetching location.";
  }
  