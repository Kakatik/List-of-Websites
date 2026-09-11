let everything = document.getElementById("everything");
let movies = document.getElementById("movies");
let games = document.getElementById("games");
let audio = document.getElementById("audio");
let apps = document.getElementById("apps");
let other = document.getElementById("other");
let categories = [
    everything,
    movies,
    games,
    audio,
    apps,
    other
];
for (let category of categories) {
    category.addEventListener("change", function() {
        if (this.checked) {
            for (let otherCategory of categories) {
                if (otherCategory !== this) {
                    otherCategory.checked = false;
                }
            }
        } else {
            this.checked = true;
        }
        doSearch();
    });
}
async function doSearch() {
    let query = document.getElementById("search").value.toLowerCase();
    let results = document.getElementById("results");
    results.innerHTML = "";
    if (query === "") {
        return;
    }
    let files = [];
    if (everything.checked) {
        files = [
            "movies.html",
            "games.html",
            "audio.html",
            "apps.html",
            "other.html"
        ];
    }
    if (movies.checked) {
        files = ["movies.html"];
    }
    if (games.checked) {
        files = ["games.html"];
    }
    if (audio.checked) {
        files = ["audio.html"];
    }
    if (apps.checked) {
        files = ["apps.html"];
    }
    if (other.checked) {
        files = ["other.html"];
    }
    for (let file of files) {
        let response = await fetch(file);
        let html = await response.text();
        let parser = new DOMParser();
        let page = parser.parseFromString(html, "text/html");
        let links = page.querySelectorAll("a");
        for (let link of links) {
            if (link.textContent.toLowerCase().includes(query)) {
                let result = document.createElement("a");
                result.textContent = link.textContent;
                result.href = link.href;
                result.target = "_blank";
                results.appendChild(result);
                results.appendChild(document.createElement("br"));
            }
        }
    }
}
document.getElementById("search").addEventListener("input", doSearch);