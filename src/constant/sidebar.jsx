export const sidebarItem = [
    {
        label: 'THEO DÕI',
        items: [
            {
                icon: <i className="fa-solid fa-chart-line"></i>,
                active: ['dashboard'],
                label: 'Dashboard',
                links: [
                    {title: 'Thống kê chung', to: '/'},
                    {title: 'Thống kê khách hàng', to: '/dashboard/user/index'}
                ]
            }
        ]
    },
    {
        label: 'QUẢN TRỊ',
        items: [
            {
                icon: <i class="fa-solid fa-square-plus"></i>,
                label: 'Quản lý  đặt phòng',
                links: [
                    {title: ' Xem phòng trống ', to: '/room-available'},
                    {title: ' Quản lý đặt phòng ', to: '/list-booking'},
                ]
            },
            {
                icon: <i className="fa-solid fa-users-gear"></i>,
                active: ['user'],
                label: 'Quản lý  người dùng',
                links: [
                    {title: ' Danh sách chung ', to: '/user/index'},
                    {title: ' Quản lý', to: '/user/admin'},
                    {title: ' Nhân viên', to: '/user/staff'},
                    {title: ' Khách hàng', to: '/user/customer'}
                ]
            },
            {
                icon: <i className="fa-solid fa-hotel"></i>,
                active: ['hotel'],                
                label: 'Quản lý khách sạn',
                links: [
                    {title: ' Khách sạn', to: '/hotel/index'},
                    {title: ' Chi nhánh', to: '/hotel/index'}
                ]
            },
            {
                icon: <i className="fa-brands fa-buromobelexperte"></i>,
                label: 'Quản lý phòng',
                links: [
                    {title: ' Phòng', to: '/room/index'},
                    {title: ' Loại phòng', to: 'room/room-types'}
                ]
            },
            {
                icon: <i class="fa-solid fa-list"></i>,
                label: 'Các mục khác',
                links: [
                    {title: 'Dịch vụ', to: '/services'},
                    {title: ' Phiếu giảm giá', to: '/vouchers'}
                ]
            }
        ]
    }
]
