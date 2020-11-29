<template lang="pug">
  div(id="app")
    .app__loading-wrapper(v-if="data === null")
      .spinner-grow(v-for="_ in [1, 2, 3]" style="width: 3rem; height: 3rem;" role="status")
        span.sr-only Loading...
    .app__wrapper(v-else)
      Graph( height="calc(100vh)" :chart-data="datacollection" :yTicks="{min: 0, max: 10000}")
      VueSlider(
        v-model="sliderValues"
        :max="data.length"
        @drag-end="fillData()"
        :min-range="pointsNumber"
        :dotSize="30"
        :fixed="!sliderAvailable"
        :dotOptions="{'disabled': !sliderAvailable}"
        )

    input(v-model="pointsNumber" type="number" @change="fillData" :min="0" :max='this.sliderValues[1] - this.sliderValues[0]')
</template>

<script>
import { mobileCheck } from "@/assets/js/mobileDetection";
import Graph from "@/vue-components/Graph";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import { pythonWrapper } from "@/assets/js/python";


export default {
  name: 'app',
  components: {Graph, VueSlider},
  data () {
    return {
      toggleStatus: false,
      data: null,
      datacollection: {},
      sliderValues: [0, 100],
      graphData: null,
      pointsNumber: 30,
      currentCityId: 1,
      sliderAvailable: true,
      numpyLoadedStatus: false,
      currentCity: 'Новосибирск',
    }
  },
  methods: {
    fillData () {
      // if (this.graphData === null) { this.graphDataInitialization() } else {this.changeGraphData()}
      this.graphDataInitialization()
      this.datacollection = {
        datasets: [
          {
            label: `График прогнозируемого энергопотребления в г. ${this.currentCity}`,
            backgroundColor: '#f87979',
            data: this.graphData,
          }
        ],
      }
    },
    // changeGraphDataPy (pyodide) {
    //   window.graphData = this.graphData;
    //   window.group = Math.floor(this.data.slice(this.sliderValues[0], this.sliderValues[1]).length / this.pointsNumber);
    //   window.pointsNumber = this.pointsNumber;
    //   window.data = this.data.map(element => element[1]);
    //   window.sliderLeftCoordinate = this.sliderValues[0]
    //   console.log(pyodide.runPython(`
    //     import numpy as np
    //     import js
    //     data = np.array(js.window.data[js.window.sliderLeftCoordinate:js.window.sliderLeftCoordinate + js.window.pointsNumber * js.window.group])
    //     graphData = np.array(js.window.data[:js.window.pointsNumber * js.window.group]).reshape(-1, js.window.group).mean(axis=1)
    //   `))
    //   this.graphData = pyodide.globals.graphData;
    //   console.log('this.graphData after')
    //   console.log(this.graphData)
    //   window.graphDate = null;
    //   window.group = null;
    //   window.pointsNumber = null;
    // },
    // changeGraphData () {
    //   this.sliderAvailable = false;
    //   if (this.data !== null) {
    //     try {
    //       pythonWrapper(this.changeGraphDataPy, !this.numpyLoadedStatus);
    //       this.numpyLoadedStatus = true;
    //     } catch(error) {
    //       console.log(error.response)
    //     }
    //   } else { this.graphData = {} }
    //   this.sliderAvailable = true;
    // },
    graphDataInitialization () {
      this.sliderAvailable = false;
      if (this.data !== null) {
        try {
          this.$axios
              .get('http://127.0.0.1:8000/city/get-city-timeseries/', { params: {
                  'city_id': this.currentCityId,
                  'start_datetime': this.data[this.sliderValues[0]][0].toString(),
                  'end_datetime': this.data[this.sliderValues[1]][0].toString(),
                  'points_number': this.pointsNumber,
                }
              })
              .then(response => {
                this.graphData = response.data.map(element => element[1]);
              })
        } catch(error) {
          console.log(error.response)
        }
      }
      this.sliderAvailable = true;
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
