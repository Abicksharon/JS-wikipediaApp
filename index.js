let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById("spinner");


function displayResults(eachItems) {
    let {
        title,
        description,
        link
    } = eachItems;

    let resultContainer = document.createElement("div");
    searchResults.appendChild(resultContainer);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    titleEl.textContent = title;
    resultContainer.appendChild(titleEl);

    let breakEl = document.createElement("br");
    resultContainer.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.target = "_blank";
    urlEl.href = link;
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    resultContainer.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultContainer.appendChild(descriptionEl);


}



function eachResult(search_results) {
    spinner.classList.toggle("d-none");
    for (let eachItem of search_results) {
        displayResults(eachItem);
    }
}



function gettingSearcheResults(event) {
    if (event.key==="Enter") {
        searchResults.textContent = "";

        spinner.classList.toggle("d-none");
        let searchItem = event.target.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchItem;
        let option = {
            method: "GET"
        }
        fetch(url, option)
            .then(response=> {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                eachResult(search_results);

            })
    }
}

searchInput.addEventListener("keyup", gettingSearcheResults);