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
}