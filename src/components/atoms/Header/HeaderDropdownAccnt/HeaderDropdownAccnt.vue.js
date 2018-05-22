import Avatar from 'vue-avatar'

export default {
  name: 'header-dropdown-accnt',

  components: {
    Avatar
  },

  data: () => {
    return {
      username: '',
      itemsCount: 42
    }
  },

  mounted () {
    this.username = this.userInfo.email
  },

  methods: {
    onLogout () {
      this.$cookie.delete('token')
      this.$router.replace('/login')
    }
  }
}
