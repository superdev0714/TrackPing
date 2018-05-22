import HeaderDropdownAccnt from '../HeaderDropdownAccnt/HeaderDropdownAccnt'

export default {
  name: 'Navbar',
  components: {
    HeaderDropdownAccnt
  },

  created () {
    // document.body.classList.toggle('sidebar-hidden')
  },

  methods: {
    sidebarToggle (e) {
      console.log('===========')
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }
}
