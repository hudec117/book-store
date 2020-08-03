import ApiProxy from './api-proxy';

export default class BooksRepository {
    async getAll() {
        const response = await fetch('/api/books');

        return await response.json();
    }

    async get(id) {
        const response = await fetch('/api/books/' + id);

        return await response.json();
    }

    async create(book) {
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

        const response = await ApiProxy.fetchRestricted('/api/books', {
            method: 'POST',
            body: formData
        });

        return await response.json();
    }

    async updateStock(id, newStock) {
        await ApiProxy.fetchRestricted('/api/books/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stock: newStock
            })
        });
    }
}