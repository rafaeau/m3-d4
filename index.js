window.onload = () => {
    displayBooks();
}

const displayBooks = () => {
    return fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then(books => {
        console.log(books)
    })

    .catch(err => console.error(err))

}