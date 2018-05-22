export const NavItemsList = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-dashboard',
    badge: {
      variant: 'primary',
      text: 'NEW'
    },
    class: 'mt-5'
  },
  {
    name: 'Transactions',
    url: '/transactions',
    icon: 'fa fa-refresh',
    children: [
      {
        name: 'My Transactions',
        url: '/transactions',
        icon: 'fa fa-refresh'
      },
      {
        name: 'Start Transaction',
        url: '/transactions/create',
        icon: 'fa fa-refresh'
      }
    ]
  },
  {
    name: 'Get Verified',
    url: '/get-verified/manage',
    icon: 'fa fa-check-square'
  },
  {
    name: 'Help',
    url: '/help',
    icon: 'fa fa-question-circle'
  }
]
