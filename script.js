const search = document.getElementById("search");

search.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = search.value;
    if (query.trim() !== "") {
      window.location.href = "https://www.ecosia.org/search?q=" + encodeURIComponent(query);
    }
  }
})
