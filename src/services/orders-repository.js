export default class OrdersRepository {
    getAll() {
        return new Promise((resolve, reject) => {
            fetch('/api/orders', {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then(response => {
                response.json().then(orders => {
                    resolve(orders);
                }).catch(reject);
            }).catch(reject);
        });
    }
}