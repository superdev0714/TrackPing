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
      center: {lat: 37.431489, lng: -122.163719},
      markers: [{
        position: {lat: 37.431489, lng: -122.163719},
        label: 'S',
        draggable: false,
        title: 'Stanford',
        www: 'https://www.stanford.edu/'
      }, {
        position: {lat: 37.394694, lng: -122.150333},
        label: 'T',
        draggable: false,
        title: 'Tesla',
        www: 'https://www.tesla.com/'
      }, {
        position: {lat: 37.331681, lng: -122.030100},
        label: 'A',
        draggable: false,
        title: 'Apple',
        www: 'https://www.apple.com/'
      }, {
        position: {lat: 37.484722, lng: -122.148333},
        label: 'F',
        draggable: false,
        title: 'Facebook',
        www: 'https://www.facebook.com/'
      }],
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
    const database = firebase.database()
    var currentUser = firebase.auth().currentUser
    database.ref('users').child(currentUser.uid).on('value', snapshot => {
      console.log(snapshot.val())
      let data = snapshot.val()
      Object.keys(data).forEach(function (name) {
        console.log(name)
      })
    })
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
    }
  }
}
