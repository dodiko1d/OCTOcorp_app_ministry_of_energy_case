<template lang="pug">
  div(id="app")
    div(v-if="!toggleStatus")
      router-view
</template>

<script>
import fontSizeNormalization from "./assets/js/fontSizeNormalization";
import './assets/sass/vue-bootstrap.sass';
import { mobileCheck } from "@/assets/js/mobileDetection";


export default {
  name: 'app',
  data () {
    return {
      toggleStatus: false,
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
  }
}
</script>

<style lang="sass">
  /* Different browsers preset styles reset. */
  @import 'assets/sass/variables'
  @import 'assets/sass/style-reset'
  html
    overflow-y: scroll

  .router-view
    @extend .router-view-collapsed!optional

  *::-webkit-scrollbar-track
    transition: 2s
    background-color: $company-black

  *::-webkit-scrollbar
    transition: 2s
    width: 12px
    background-color: $company-black

  *::-webkit-scrollbar-thumb
    transition: 2s
    background-color: #ffffff

</style>
