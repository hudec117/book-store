export default class ApiProxy {
    static async fetchRestricted(input, init) {
        if (init == null || init == undefined)
            init = {};
        if (!('headers' in init))
            init.headers = {};

        // Add the authorisation header with the JWT token
        init.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');

        return await fetch(input, init);
    }
}