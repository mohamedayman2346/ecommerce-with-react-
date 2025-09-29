import {faUsers, faBasketShopping, faPlus, faTruckFast, faGrip} from '@fortawesome/free-solid-svg-icons'
export const Links = [
    {
        name: 'Dashboard',
        path: 'dashboardPage',
        icon: faGrip,
        role: ["1995", "1991", "1999"],
        title: 'Dashboard',
    },
    {
        name: 'Users',
        path: 'users',
        icon: faUsers,
        role: ["1995"],
        title: 'Users',
    },

    {
        name: 'Add User',
        path: '/dashboard/user/add',
        icon: faPlus,
        role: ['1995'],
        title: 'Add User',
    },

    {
        name: 'Categories',
        path: '/dashboard/Categories',
        icon: faBasketShopping,
        role: ['1995', '1999'],
        title: 'Categories',
    },
    {
        name: 'Add Category',
        path: '/dashboard/Category/add',
        icon: faPlus,
        role: ['1995', '1999'],
        title: 'Add Category',
    },
    {
        name: 'Products',
        path: '/dashboard/products',
        icon: faTruckFast,
        role: ['1995', '1999'],
        title: 'Products',
    },
    {
        name: 'Add Product',
        path: '/dashboard/product/add',
        icon: faPlus,
        role: ['1995', '1999'],
        title: 'Add Product',
    },

   
]

