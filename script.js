const search = document.getElementById("search");
const searchButtons = document.querySelectorAll(".search-engines button");
const music = document.getElementById("music");
const playButton = document.getElementById("playButton");
const engines = {
  google: "https://www.google.com/search?q=",
  ddg: "https://duckduckgo.com/?q=",
  wiki: "https://en.wikipedia.org/w/index.php?search="
};
let engine = "wiki";

searchButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    engine = button.dataset.engine
    searchButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    })

    button.classList.add("selected");
    search.focus();
  })
})

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = search.value.trim();
    if (query !== "") {
      window.open(
        engines[engine] + encodeURIComponent(query),
        "_blank"
      );
    }
  }
});

playButton.addEventListener("click", function () {
    if (music.paused) {
        music.play();
        playButton.textContent = "||";
    } else {
        music.pause();
        playButton.textContent = "▶";
    }
});

function samay() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM"

  hours = hours % 12
  if (hours === 0) {
    hours = 12
  }

  document.getElementById("clock").textContent = `${hours}:${minutes}`
  document.getElementById("ampm").textContent = ampm;
  document.getElementById("date").textContent =
      now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long"
      });
}

async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );

    const data = await response.json();

    const temperature = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    let status = "Unknown";

    if (code === 0) {
      status = "Clear";
    } else if (code <= 3) {
      status = "Cloudy";
    } else if (code <= 48) {
      status = "Foggy";
    } else if (code <= 67) {
      status = "Rain";
    } else if (code <= 77) {
      status = "Snow";
    } else if (code <= 82) {
      status = "Rain showers";
    } else {
      status = "Storm";
    }

    document.getElementById("weather-temp").textContent =
      `${temperature}°C`;

    document.getElementById("weather-status").textContent =
      status;

    getPlace(latitude, longitude);

  } catch (error) {
    console.log("Weather error:", error);

    document.getElementById("weather-status").textContent =
      "Weather unavailable";
  }
}

async function getPlace(latitude, longitude) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      document.getElementById("weather-place").textContent =
        data.results[0].name;
    }
  } catch (error) {
    console.log("Location name error:", error);
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    document.getElementById("weather-status").textContent =
      "Location unavailable";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getWeather(latitude, longitude);
    },
    function () {
      document.getElementById("weather-status").textContent =
        "Location denied";

      document.getElementById("weather-place").textContent =
        "Location required";
    }
  );
}

locateUser();
samay();
setInterval(samay, 1000);
