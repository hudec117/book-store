import Vue from 'vue';
import VueRouter from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode'

import Home from '../views/Home.vue';
import Books from '../views/Books.vue';
import Book from '../views/Book.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Basket from '../views/Basket.vue';
import Orders from '../views/Orders.vue';
import Stock from '../views/Stock.vue';
import NotAuthorised from '../views/NotAuthorised.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

// Access levels:
// anonymous        - viewable by anyone
// anonymous-only   - viewable only by anonymous users (for register/login pages)
// restricted       - viewable only by authenticated users
// restricted-staff - viewable only be authenticated staff users

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
            access: 'anonymous'
        }
    },
    {
        path: '/books',
        name: 'books',
        component: Books,
        meta: {
            title: 'Books',
            access: 'anonymous'
        }
    },
    {
        path: '/books/:id',
        name: 'book',
        component: Book,
        meta: {
            title: 'Book',
            access: 'anonymous'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            access: 'anonymous-only'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            access: 'anonymous-only'
        }
    },
    {
        path: '/basket',
        name: 'basket',
        component: Basket,
        meta: {
            title: 'Basket',
            access: 'restricted'
        }
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders,
        meta: {
            title: 'Orders',
            access: 'restricted-staff'
        }
    },
    {
        path: '/stock',
        name: 'stock',
        component: Stock,
        meta: {
            title: 'Stock',
            access: 'restricted-staff'
        }
    },
    {
        path: '/not-authorised',
        name: 'not-authorised',
        component: NotAuthorised,
        meta: {
            title: 'Not Authorised',
            access: 'anonymous'
        }
    },
    {
        path: '*',
        name: 'catch-all',
        component: NotFound
    }
];

const router = new VueRouter({
    routes,
    linkExactActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    // Redirect to NotFound page if not routes matched and
    // defaulted to the catch-all route.
    if (to.name == 'catch-all') {
        return next();
    }

    // Set the title dynamically based on the current route.
    document.title = `Aston Book Store - ${to.meta.title}`;

    // Get the token from session storage
    const token = window.localStorage.getItem('token');
    const isAuthenticated = token != null;

    // Work out whether the user can navigate to the requested route.
    let canContinue = false;
    if (isAuthenticated) {
        if (to.meta.access === 'restricted-staff') {
            const user = VueJwtDecode.decode(token);
            canContinue = user.staff;
        } else if (to.meta.access === 'anonymous-only') {
            canContinue = false;
        } else {
            canContinue = true;
        }
    } else {
        canContinue = ['anonymous', 'anonymous-only'].includes(to.meta.access);
    }

    if (!canContinue) {
        next('/not-authorised');
    } else {
        next();
    }
});

export default router;
