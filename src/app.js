import 'script-loader!jquery'
import 'script-loader!what-input'
import 'script-loader!foundation-sites'
import Vue from 'vue'
import App from './App.vue'

// Global Styles
// ----------------------
import './scss/app.scss'

// Vue Init
// ----------------------
new Vue({
  el: '#app',
  render: h => h(App),
  ready () {
    // eslint-disable-next-line
    $(this.$el).foundation()
  }
})

// Foundation Config
// ----------------------
Foundation.Accordion.defaults.slideSpeed = 500
Foundation.Accordion.defaults.multiExpand = false

// Foundation Init
// ----------------------
// eslint-disable-next-line
$(document).foundation()

// Tests
// ----------------------

// jQuery Test
$('#jquery-test').fadeOut(5000)
