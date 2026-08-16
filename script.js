const search = document.getElementById("search");

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = search.value;
    if (query.trim() !== "") {
      window.open(
        "https://en.wikipedia.org/w/index.php?search=" + encodeURIComponent(query),
        "_blank"
      );
    }
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
