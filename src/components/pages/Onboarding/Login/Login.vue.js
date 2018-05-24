import firebase from 'firebase'
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

      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          console.log(user)
          this.$router.replace('/dashboard')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
