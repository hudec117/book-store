export default class BooksRepository {
    async getAll() {
        const response = await fetch('/api/books');

        return await response.json();
    }

    async get(id) {
        const response = await fetch('/api/books/' + id);

        return await response.json();
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