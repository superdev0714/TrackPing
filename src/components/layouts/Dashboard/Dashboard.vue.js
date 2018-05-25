import Navbar from '@/components/atoms/Header/Navbar/Navbar'
import Sidebar from '@/components/atoms/Sidebar/Sidebar/Sidebar'
import firebase from 'firebase'
import _ from 'lodash'

export const NavItemsList = [
  {
    name: 'Devices',
    title: true
  }
]

export default {
  name: 'Dashbaord',

  components: {
    Navbar,
    Sidebar
  },

  data () {
    return {
      navItems: []
    }
  },

  mounted () {
    this.getDevices()
  },

  methods: {
    getDevices () {
      const database = firebase.database()
      var currentUser = firebase.auth().currentUser
      database.ref('users').child(currentUser.uid).on('value', snapshot => {
        console.log(snapshot.val())
        let data = snapshot.val()

        this.navItems = _.cloneDeep(NavItemsList)
        Object.keys(data).forEach((name) => {
          if (name !== 'email') {
            this.navItems.push({
              name: data[name].deviceModel,
              url: '/dashboard/' + name,
              icon: 'fa fa-mobile fs-36'
            })
          }
          console.log(this.navItems)
        })
      })
    }
  }
}
