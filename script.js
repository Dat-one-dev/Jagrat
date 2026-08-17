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


samay();
setInterval(samay, 1000);
