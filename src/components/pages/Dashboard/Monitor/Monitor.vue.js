import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA'
    // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
    // v: 'OPTIONAL VERSION NUMBER',
    // libraries: 'places', //// If you need to use place input
  }
})

export default {
  name: 'google-maps',
  data () {
    return {
      deviceId: '',
      center: {lat: 37.431489, lng: -122.163719},
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
    this.getLocations()
  },

  watch: {
    '$route' () {
      // this.markers = []
      this.getLocations()
    }
  },

  methods: {
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

      const database = firebase.database()
      var currentUser = firebase.auth().currentUser

      database.ref('users').child(currentUser.uid).child(this.deviceId).on('value', snapshot => {
        console.log('-------', snapshot.val())
        let data = snapshot.val()
        this.markers = []
        if (data.locations) {
          Object.keys(data.locations).forEach((name) => {
            console.log('======', data.locations[name])
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
          })
        }
      })
    }
  }
}
