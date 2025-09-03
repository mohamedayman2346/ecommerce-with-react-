import {faUsers, faBasketShopping, faPlus, faTruckFast} from '@fortawesome/free-solid-svg-icons'
export const Links = [
    {
        name: 'Users',
        path: 'users',
        icon: faUsers,
        role: '1995',
    },

    {
        name: 'Add User',
        path: '/dashboard/user/add',
        icon: faPlus,
        role: '1995',
    },

    {
        name: 'Categories',
        path: '/dashboard/Categories',
        icon: faBasketShopping,
        role: ['1995', '1999'],
    },
    {
        name: 'Add Category',
        path: '/dashboard/Category/add',
        icon: faPlus,
        role: ['1995', '1999'],
    },
    {
        name: 'Products',
        path: '/dashboard/products',
        icon: faTruckFast,
        role: ['1995', '1999'],
    },
    {
        name: 'Add Product',
        path: '/dashboard/product/add',
        icon: faPlus,
        role: ['1995', '1999'],
    },

   
]

