import ApiProxy from './api-proxy.js';

export default class OrdersRepository {
    async getAll() {
        const response = await ApiProxy.fetchRestricted('/api/orders');

        return await response.json();
    }

    async create(orders) {
        await ApiProxy.fetchRestricted('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orders)
        });
    }
}