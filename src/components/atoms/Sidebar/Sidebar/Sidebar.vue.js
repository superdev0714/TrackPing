import SidebarHeader from '../SidebarHeader'
import SidebarNavDivider from '../SidebarNavDivider'
import SidebarNavDropdown from '../SidebarNavDropdown'
import SidebarNavLink from '../SidebarNavLink'
import SidebarNavItem from '../SidebarNavItem'

export default {
  name: 'sidebar',
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    SidebarHeader,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavItem
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
