


export const sidebarItem = [
    {
        label: 'MAIN',
        items: [
            {
                icon: <i className="fa-solid fa-chart-line"></i>,
                active: ['dashboard'],
                label: 'Dashboard',
                links: [
                    {title: 'Thống kê chung', to: '/dashboard'},
                    {title: 'Thống kê khách hàng', to: '/dashboard/user/index'}
                ]
            }
        ]
    },
    {
        label: 'MANAGEMENT',
        items: [
            {
                icon: <i className="fa-solid fa-users-gear"></i>,
                active: ['user'],
                label: 'User management',
                links: [
                    {title: ' Quản lý admin ', to: '/user/catalogue/index'},
                    {title: ' Quản lý nhân viên', to: '/user/employee'},
                    {title: ' Quản lý khách hàng', to: '/user/customer'}
                ]
            },
            {
                icon: <i className="fa-solid fa-hotel"></i>,
                active: ['hotel'],                
                label: 'Hotel management',
                links: [
                    {title: ' Quản lý khách sạn', to: '/management/user/account'},
                    {title: ' Quản lý chi nhánh', to: '/management/user/roles'}
                ]
            },
            {
                icon: <i className="fa-brands fa-buromobelexperte"></i>,
                label: 'Rom management',
                links: [
                    {title: ' Quản lý loại phòng', to: '/management/user/account'},
                    {title: ' Quản lý phòng', to: '/management/user/roles'}
                ]
            }
        ]
    }
]
