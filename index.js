window.onload = () => {
    displayBooks();
}

const displayBooks = () => {
    return fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then(books => {
        console.log(books)
        books.forEach(book => {
            const rowBooks = document.querySelector(".row > .col-8")
            const bookCards = document.createElement("div")
            bookCards.classList.add("col-12", "col-sm-6", "col-lg-3", "d-inline-block")
            bookCards.innerHTML=`
            <div class="card d-flex mb-3">
                <img src=${book.img} class="card-img-top img-fluid w-100" style="object-fit: cover;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <div class="btn-group">
                        <button type="button" onclick="hidePics(event)" class="btn btn-sm btn-outline-secondary">
                            Add
                        </button>
                        <button type="button" onclick="hidePics(event)" class="btn btn-sm btn-outline-secondary">
                            Hide
                        </button>
                    </div>
                </div>
            </div>
            `
            rowBooks.appendChild(bookCards)
        });
    })

    .catch(err => console.error(err))

}