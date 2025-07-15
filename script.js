const searchbtn = document.getElementById("searchbtn");
const searchinput = document.getElementById("searchinput");
const results = document.getElementById("results");


searchbtn.addEventListener("click", () => {
    const a = searchinput.value.trim();
    if (a) {
        searchbooks(a);
    }
});

searchinput.addEventListener("keydown", function (c) {
    if (c.key === "Enter") {
        const a = searchinput.value.trim();
        if (a) {
            searchbooks(a);
        }
    }
});
function searchbooks(a) {
    const api = `https://www.googleapis.com/books/v1/volumes?q=${a}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            displayresults(data.items);
        })
        .catch(error => {
            console.error("error in fetching data", error);
            results.innerHTML = "<p> something went wrong .</p> ";

        });
}
function displayresults(books) {
    results.innerHTML = "";

    if (!books || books.length === 0) {
        results.innerHTML = "<p> No Results Found .</p>";
        return;
    }

    books.forEach(book => {
        const info = book.volumeInfo;
        const title = info.title || "No Title";
        const authors = info.authors ? info.authors.join(" , ") : " Unknown Author ";
        const thumbnail = info.imageLinks?.thumbnail || "";
        const previewlink = info.previewLink || "#";

        const bookdiv = document.createElement("div");
        bookdiv.className = "book";
        bookdiv.innerHTML = `
  <img src="${thumbnail}" alt="${title}">
  <h3>${title}</h3>
  <p><strong>Author:</strong> ${authors}</p>
  <a href="${previewlink}" target="_blank">🔗 Preview</a>
`;

        results.appendChild(bookdiv);


    });
}

// i made a change 
// i made a change again