<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="row">
      <div class="small-12 columns">
        <div class="text-center">
          <img src="./img/logo.png">
          <h1>{{ msg }}</h1>
        </div>
        <div>
          <comp-a></comp-a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import TopBar from './components/TopBar.vue'
import CompA from './components/CompA.vue'

export default {
  data () {
    return {
      msg: 'Vue.js 2 | Foundation 6 | Webpack 2'
    }
  },
  components: {
    TopBar,
    CompA
  },
  ready () {
    // Init Foundation for VueJs
    $(this.$el).foundation()
  }
}
</script>
