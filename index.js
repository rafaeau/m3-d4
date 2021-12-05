let booksArr = []
let cartList = []
const cart = document.querySelector(".row .col-4")

window.onload = () => {
    displayBooks();
}

const displayBooks = () => {
    return fetch("https://striveschool-api.herokuapp.com/books")
        .then(response => response.json())
        .then(books => {
            console.log(books)
            books.forEach(book => {
                booksArr.push(book)
                const colBooks = document.querySelector(".row > .col-8")
                const bookCards = document.createElement("div")
                bookCards.classList.add("col-12", "col-sm-6", "col-lg-4", "d-inline-block")
                bookCards.innerHTML = `
                    <div class="card d-flex mb-3">
                        <img src=${book.img} class="card-img-top img-fluid w-100" style="object-fit: cover;" alt="...">
                        <div class="card-body">
                            <h6 class="card-title">${book.title}</h6>
                            <small class="text-muted d-block mt-n2 mb-2">${book.category}</small>
                            <p class="d-none">${book.asin}</p>
                            <div class="btn-group">
                                <button type="button" onclick="addToCart(${book.asin})" class="btn btn-sm btn-outline-secondary">
                                    $${book.price}
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

const refreshCartList = () => {
    cart.innerHTML = `<h3>Cart: ${cartList.length}</h3>`
    cartList.forEach(book => {
        cart.classList.add("col-12", "col-sm-6", "col-lg-4", "d-inline-block")
        cart.innerHTML += `
        <div class="card d-flex mb-3">
            <img src=${book.img} class="card-img-top img-fluid w-100" style="object-fit: cover;" alt="...">
            <div class="card-body">
                <h6 class="card-title">${book.title}</h6>
                <small class="text-muted d-block mt-n2 mb-2">${book.category}</small>
                <p class="d-none">${book.asin}</p>
                <div class="btn-group">
                    <button type="button" onclick="removeBook(event)" class="btn btn-sm btn-outline-secondary">
                        Delete
                    </button>
                </div>
            </div>
        </div>`
    })
}

const addToCart = (asin) => {
    const book = booksArr.find(book => book.asin === String(asin))
    cartList.push(book)
    refreshCartList()
    console.log(asin)
    console.log(cartList)
    event.path[3].classList.toggle("selected")
}


const removeBook = (event) => {
    console.log(event)
    event.path[3].remove()
    cartList.forEach(book => {
        if (event.path[2].childNodes[5].innerText == String(book.asin)) {
            index = cartList.indexOf(book)
            cartList.splice(index, index + 1)
            console.log(cartList)
        }
    })
    booksArr.forEach(book => {
        if (event.path[2].childNodes[5].innerText == String(book.asin)) {
            book.style.border = ""
        }
    })
    refreshCartList()
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
                        <small class="text-muted d-block mt-n2 mb-2">${book.category}</small>
                        <p class="d-none">${book.asin}</p>
                        <div class="btn-group">
                            <button type="button" onclick="addToCart(${book.asin})" class="btn btn-sm btn-outline-secondary">
                                $${book.price}
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