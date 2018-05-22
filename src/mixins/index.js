import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

const eventHub = new Vue()

export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    eventHub () {
      return eventHub
    },
    token () {
      return this.store.getters.sessionData.SPAToken
    }
  },
  methods: {
    ...mapActions([
      'clearAuthData'
    ]),
    logout () {
      this.clearAuthData()
      this.$cookie.delete('token')
      this.$router.replace('/login')
    },
    formatNumber (number) {
      const x = 3
      const n = 0
      const regExp = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')'
      return number.toString().replace(/[^0-9,]/g, '').replace(new RegExp(',', 'g'), '').replace(new RegExp(regExp, 'g'), '$&,')
    },
    formatDecimal (value) {
      let val = value.toString().replace(/,/g, '')
      return parseFloat(val)
    },
    formatPrice (value) {
      let val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatDate (value) {
      return value.getMonth() + 1 + `/` + value.getDate() + `/` + value.getFullYear()
    }
  }
}
