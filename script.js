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
