window.onload = () => {
    displayBooks();
}

const displayBooks = () => {
    return fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then(books => {
            console.log(books)
            books.forEach(book => {
                const colBooks = document.querySelector(".row > .col-8")
                const bookCards = document.createElement("div")
                bookCards.classList.add("col-12", "col-sm-6", "col-lg-4", "d-inline-block")
                bookCards.innerHTML = `
            <div class="card d-flex mb-3">
                <img src=${book.img} class="card-img-top img-fluid w-100" style="object-fit: cover;" alt="...">
                <div class="card-body">
                    <h6 class="card-title">${book.title}</h6>
                    <div class="btn-group">
                        <button type="button" onclick="addToCart(event)" class="btn btn-sm btn-outline-secondary">
                            Add
                        </button>
                        <button type="button" onclick="removeBook(event)" class="btn btn-sm btn-outline-secondary">
                            Skip
                        </button>
                    </div>
                </div>
            </div>
            `
                colBooks.appendChild(bookCards)
            });
        })

        .catch(err => console.error(err))

}


const addToCart = (event) => {
    const colCart = document.querySelector(".row > .col-4")
    const booksCart = document.createElement("div")
    booksCart.classList.add("col-12", "col-sm-6", "col-lg-6", "d-inline-block")
    colCart.appendChild(booksCart)
    const cloneNode = event.path[3].cloneNode(true) // refactore without clone node
    booksCart.appendChild(cloneNode)
    event.path[3].style.border = "3px solid red"
}

const removeBook = (event) => {
    event.path[3].remove()
}

const filterBooks = (event) => {

    const searchQuery = event.target.value
    console.log(searchQuery)

    return fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then(books => {

            const colBooks = document.querySelector(".row > .col-8")

            colBooks.innerHTML = ""

            const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))

            console.log(filteredBooks)

            filteredBooks.forEach(book => {
                const colBooks = document.querySelector(".row > .col-8")
                const bookCards = document.createElement("div")
                bookCards.classList.add("col-12", "col-sm-6", "col-lg-4", "d-inline-block")
                bookCards.innerHTML = `
                    <div class="card d-flex mb-3">
                        <img src=${book.img} class="card-img-top img-fluid w-100" style="object-fit: cover;" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">${book.title}</h6>
                            <div class="btn-group">
                                <button type="button" onclick="addToCart(event)" class="btn btn-sm btn-outline-secondary">
                                    Add
                                </button>
                                <button type="button" onclick="removeBook(event)" class="btn btn-sm btn-outline-secondary">
                                    Skip
                                </button>
                            </div>
                        </div>
                    </div>
                    `

                colBooks.appendChild(bookCards)
            })
        })
        .catch(err => console.log(err))

}