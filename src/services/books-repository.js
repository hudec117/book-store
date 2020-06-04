export default class BooksRepository {
    getAll() {
        return [
            {
                id: 'ad8fe0ff-5fb5-4b79-9b1e-7f1da8dd1201',
                title: 'Apex',
                price: 20,
                author: 'Ramez Naam',
                year: 2015
            },
            {
                id: '481406da-4fec-4815-9488-fdddd749076d',
                title: 'Nexus',
                price: 15,
                author: 'Ramez Naam',
                year: 2012
            },
            {
                id: '28e6f174-411f-480b-a6d2-def8e2593fcb',
                title: 'Crux',
                price: 30,
                author: 'Ramez Naam',
                year: 2013
            }
        ];
    }
}