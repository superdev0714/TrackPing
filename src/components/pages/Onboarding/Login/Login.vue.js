import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    ...mapActions([
      'updateUserInfo'
    ]),
    onLogin () {
      this.$validator.validateAll('login-form').then((v) => {
        if (v) {
          this.login()
        }
      })
    },
    login () {
      this.errorMessage = ''

      this.$router.replace('/dashboard')
      // this.$http.post('login', {
      //   email: this.email,
      //   password: this.password
      // }).then(res => {
      //   if (res.data.token) {
      //     const SPAToken = res.data.token
      //     const expirationDate = new Date()
      //     expirationDate.setMinutes(expirationDate.getMinutes() + res.data.session_length / 60)
      //     this.$cookie.set('token', SPAToken, {expires: expirationDate})
      //     if (res.data.userInfo) {
      //       this.updateUserInfo(res.data.userInfo)
      //     }
      //     this.$router.replace('/dashboard')
      //   }
      //   if (res.data.err) {
      //     this.errorMessage = res.data.err
      //   }
      // }).catch(err => {
      //   console.error('auth err:', err)
      //   this.errorMessage = 'Login Failed. Please try again.'
      // })
    }
  }
}
