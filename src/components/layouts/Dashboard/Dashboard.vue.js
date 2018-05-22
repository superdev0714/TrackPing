import Navbar from '@/components/atoms/Header/Navbar/Navbar'
import Sidebar from '@/components/atoms/Sidebar/Sidebar/Sidebar'
import { NavItemsList } from '@/data/navigation_items.js'
import { mapActions } from 'vuex'

export default {
  name: 'Dashbaord',

  components: {
    Navbar,
    Sidebar
  },

  data () {
    return {

    }
  },

  computed: {
    NavItemsList () {
      return NavItemsList
    }
  },

  mounted () {
    this.getUserInfo()
  },

  watch: {
    '$route' () {
      this.getUserInfo()
    }
  },

  methods: {
    ...mapActions([
      'updateUserInfo'
    ]),
    getUserInfo () {
      // this.$http.get('userInfo').then(res => {
      //   console.log(res.data)
      //   if (res.data.err) {
      //     this.logout()
      //   }
      //   if (res.data.userInfo) {
      //     this.updateUserInfo(res.data.userInfo)
      //   }
      // }).catch(err => {
      //   console.error('auth err:', err)
      //   this.logout()
      // })
    }
  }
}
