<template lang="pug">
  div(id="app")
    .app__loading-wrapper(v-if="graphData === null || data === null")
      .spinner-grow(v-for="_ in [1, 2, 3]" style="width: 3rem; height: 3rem;" role="status")
        span.sr-only Loading...
    .app__wrapper(v-else)
      Graph( height="calc(100vh)" :chart-data="datacollection" :yTicks="{min: 0, max: 10000}")
      VueSlider(
        v-model="sliderValues"
        :enableCross="false"
        :max="data.length"
        @drag-end="fillData()"
        )
</template>

<script>
import { mobileCheck } from "@/assets/js/mobileDetection";
import Graph from "@/vue-components/Graph";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'


export default {
  name: 'app',
  components: {Graph, VueSlider},
  data () {
    return {
      toggleStatus: false,
      data: null,
      datacollection: {},
      sliderValues: [0, 100],
      graphData: {},
    }
  },
  methods: {
    fillData () {
      this.changeGraphData()
      this.datacollection = {
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.graphData,
          }
        ],
      }
    },
    changeGraphData () {
      if (this.data !== null) {
        let newData = [];
        for(let i = this.sliderValues[0]; i < this.sliderValues[1]; i += Math.floor((this.sliderValues[1] - this.sliderValues[0]) / 30)) {
          let dotValue = 0;
          for (let j = 0; j < Math.floor((this.sliderValues[1] - this.sliderValues[0]) / 30); j++) { dotValue += this.data[i + j][1] }
          newData.push(Math.floor(dotValue / (this.sliderValues[1] - this.sliderValues[0]) * 30))
        }
        this.graphData = newData
      } else { this.graphData = {} }
    }
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      this.toggleStatus = isJustShown;
    })
    mobileCheck();
    if (window.mobileCheck()) {

      document.body.setAttribute('mobile-device', '');
    }
    this.$axios
        .get('http://127.0.0.1:8000/city/get-city-data/1')
        .then(response => {
          this.data = response.data;
          this.data = this.data
              .map(element => [new Date(element[0]), element[1]])
          // this.sliderValues = [0, length.data.length]
        })
    this.fillData()
  }
}
</script>

<style lang="sass">
  /* Different browsers preset styles reset. */
  @import 'assets/sass/variables'
  @import 'assets/sass/style-reset'

  .router-view
    @extend .router-view-collapsed!optional

  #app
    height: 100vh

  .center
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%

  .app__loading-wrapper
    @extend .center


  .spinner-grow
    margin: 0 2em
    &:nth-of-type(1)
      color: $company-yellow
    &:nth-of-type(2)
      color: $company-black
    &:nth-of-type(3)
      color: $company-red
</style>
