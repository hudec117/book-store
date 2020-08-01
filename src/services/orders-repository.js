import ApiProxy from './api-proxy.js';

export default class OrdersRepository {
    async getAll() {
        const response = await ApiProxy.fetchRestricted('/api/orders');

        return await response.json();
    }
}