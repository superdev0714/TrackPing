import { loaded } from 'vue2-google-maps'
import firebase from 'firebase'

export default {
  name: 'google-maps',

  data () {
    return {
      deviceId: '',
      center: { lat: 51.7519, lng: -1.2578 },
      markers: [],
      infoContent: '',
      infoLink: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },

  mounted () {
    loaded.then(() => {
      this.directionsService = new window.google.maps.DirectionsService()
      this.getLocations()
    })
  },

  watch: {
    '$route' () {
      // this.markers = []
      this.getLocations()
    }
  },

  methods: {
    showRoute (origin, destination) {
      if (!origin || !destination) return
      this.directionsService.route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING
      }, (response, status) => {
        if (status === 'OK') {
          const directionsDisplay = new window.google.maps.DirectionsRenderer({
            map: this.$refs.gMap.$mapObject
          })
          directionsDisplay.setDirections(response)
        }
      })
    },
    toggleInfoWindow (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.title
      this.infoLink = marker.www
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.currentMidx = idx
        this.infoWinOpen = true
      }
    },
    getLocations () {
      if (this.$route.params != null) {
        this.deviceId = this.$route.params.id
      }

      // let origin = null
      // let destination = null

      const database = firebase.database()
      var currentUser = firebase.auth().currentUser

      // database.ref('users').child('Kwe12S9LeNXx4lfM6ZTKefROd9G3').child('2166b33e9c4a0bb5').on('value', snapshot => {
      database.ref('users').child(currentUser.uid).child(this.deviceId).on('value', snapshot => {
        let data = snapshot.val()
        this.markers = []
        if (data.locations) {
          Object.keys(data.locations).forEach((name) => {
            const deviceInfo = data.locations[name]
            this.center = {
              lat: deviceInfo.latitude,
              lng: deviceInfo.longitude
            }
            this.markers.push({
              position: {lat: deviceInfo.latitude, lng: deviceInfo.longitude},
              label: '',
              draggable: false,
              title: deviceInfo.time
              // www: 'https://www.facebook.com/'
            })
            // origin = destination
            // destination = { lat: deviceInfo.latitude, lng: deviceInfo.longitude }
            // this.showRoute(origin, destination)
            // console.log(origin, destination)
          })
          this.$refs.gMap.$mapObject.setCenter(this.center)
          this.$refs.gMap.$mapObject.setZoom(12)
        }
      })
    }
  }
}
