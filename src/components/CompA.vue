<template lang="html">
  <div>
    <h3>
        {{title}}
    </h3>
    <ul class="accordion" data-accordion>
      <li class="accordion-item is-active" data-accordion-item>
        <a href="#" class="accordion-title"><i class="fa fa-angle-right"></i> Webpack</a>
        <div class="accordion-content" data-tab-content>
          Webpack is a module bundler.
        </div>
      </li>
      <li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title"><i class="fa fa-angle-right"></i> VueJs</a>
        <div class="accordion-content" data-tab-content>
          The Progressive JavaScript Framework.
        </div>
      </li>
      <li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title"><i class="fa fa-angle-right"></i> Foundation</a>
        <div class="accordion-content" data-tab-content>
          A Framework for any device, medium, and accessibility.
        </div>
      </li>
      <li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title"><i class="fa fa-angle-right"></i> FontAwesome</a>
        <div class="accordion-content" data-tab-content>
          The iconic font and CSS toolkit.
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Tools'
    }
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass" scoped>

</style>
