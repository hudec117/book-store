export default class BooksRepository {
    getAll() {
        return new Promise((resolve, reject) => {
            fetch('/api/books').then(response => {
                response.json().then(books => {
                    resolve(books);
                });
            }).catch(reject);
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            fetch('/api/books/' + id).then(response => {
                response.json().then(book => {
                    resolve(book);
                });
            }).catch(reject);
        });
    }

    create(book) {
        return new Promise((resolve, reject) => {
            const bookToCreate = { ...book };
            delete bookToCreate.covers;

            // Build multipart/form-data that consists of:
            // 1. Book JSON data
            // 2. Book cover images
            const formData = new FormData();
            formData.append('book', JSON.stringify(bookToCreate));
            for (const cover of book.covers) {
                formData.append(`covers`, cover);
            }

            fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: formData
            }).then(async response => {
                if (response.ok) {
                    const createdBook = await response.json();
                    resolve(createdBook);
                } else {
                    resolve(null);
                }
            }).catch(reject);
        });
    }

    updateStock(id, newStock) {
        return new Promise((resolve, reject) => {
            fetch('/api/books/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
                body: JSON.stringify({
                    stock: newStock
                })
            }).then(resolve)
              .catch(reject);
        });
    }
}