import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
    state: () => ({
        menu: [
            {
                icon: 'HomeIcon',
                pageName: 'dashboard-overview',
                title: 'DashBoard',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'dashboard-overview',
                        title: 'Overview'
                    }
                ]
            },
            {
                icon: 'UserIcon',
                pageName: 'user',
                title: 'User',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'user-list',
                        title: 'List User'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'user-create',
                        title: 'Create User'
                    }
                ]
            },
            {
                icon: 'SlackIcon',
                pageName: 'brand',
                title: 'Brand',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'brand-list',
                        title: 'List Brand'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'brand-create',
                        title: 'Create Brand'
                    }
                ]
            },
            {
                icon: 'ShoppingBagIcon',
                pageName: 'product',
                title: 'Product',
                subMenu: [
                    {
                        icon: 'ListIcon',
                        pageName: 'product-list',
                        title: 'List Product'
                    },
                    {
                        icon: 'PlusSquareIcon',
                        pageName: 'product-create',
                        title: 'Create Product'
                    }
                ]
            }
        ]
    })
})
