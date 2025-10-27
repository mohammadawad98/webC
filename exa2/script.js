const search = document.getElementById("text");
const searchButton = document.getElementById("button");
const value = document.getElementById("values");

searchButton.addEventListener("click", function () {
    let searchValue = search.value.trim();

    if (searchValue === "") {
        alert("no value in search");
    } else {
        value.innerHTML = "";
        let apiVal = new XMLHttpRequest();
        apiVal.open('GET', `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(searchValue)}`);
        apiVal.responseType = "json";

        apiVal.onreadystatechange = function () {
            if (apiVal.status === 200) {
                let response = apiVal.response;

                if (response.data && response.data.length > 0) {
                    ProccesData(response.data);
                } else {
                    alert("no value");
                }

            } else {
                alert("search error!!");
            }

        };
        apiVal.send();
    }
});

function ProccesData(data) {
    for (let i = 0; i < data.length; i++) {
        let art = data[i];

        let dataContainer = document.createElement("div");
        dataContainer.setAttribute("class", "info");

        let title = document.createElement("h3");
        title.innerText = art.title;

        let image = document.createElement("img");
        if (art.thumbnail && art.thumbnail.lqip) {
            image.setAttribute("src", art.thumbnail.lqip);
            image.setAttribute("alt", art.thumbnail.alt_text);
        } else {
            image.setAttribute("src", "no");
            image.setAttribute("alt", "no");
        }

        dataContainer.appendChild(title);
        dataContainer.appendChild(image);
        value.appendChild(dataContainer);
    }
}