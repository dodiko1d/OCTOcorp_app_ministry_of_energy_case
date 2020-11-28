<template lang="pug">
  div.home
    | {{ info.data }}
</template>

<script>
  import CommonMethods from "./CommonMethods";

  export default {
    mixins: [CommonMethods],
    data() {
      return{
        slide: 0,
        slidesNumber: null,
        sliding: null,
        topCarouselInterval: 0,
        landingWidth: document.documentElement.clientWidth,
        landingHeight: document.documentElement.clientHeight - 64,
        info: null,
      };
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true;
        // if (slide === this.slidesNumber) {
        //   this.topCarouselInterval = 0;
        // } else {
        //   this.topCarouselInterval = 7000;
        // }
      },
      onSlideEnd(slide) {
        this.sliding = false;
      },
      updateLandingWidth() {
        this.landingWidth = document.documentElement.clientWidth;
      },
      updateLandingHeight() {
        this.landingHeight = document.documentElement.clientHeight - 64;
      }
    },
    mounted() {
      this.$axios
          .get('http://127.0.0.1:8000/city/get-city-data/1')
          .then(response => {
            this.info = Array(response);
            this.info = this.info.map(element => [Date.parse(element[0]), element[1]]);
          })
      this.slidesNumber = document.querySelector('#home__landing__carousel')
        .children
        .length;
      // this.setMobileVhVariable();
    },
    created() {
      window.addEventListener('resize', () => {
        this.updateLandingWidth();
        this.updateLandingHeight();
      })
    },
  }
</script>

<style lang="sass">
  @import '../assets/sass/variables'
  @debug (unquote('body'))

  .home
    margin-top: 64px

  .home__landing__carousel
    position: relative
    background: $company-black
    text-shadow: 1px 1px 2px $company-black

  .home__landing__form
    @extend .mx-auto
    position: relative
    top: calc(-80vh + 64px)
    width: 80%

  .home__landing__image
    display: block
    width: 100vw
    height: calc(100vh - 64px)
    background-size: cover
    background-position: center

  body[mobile-device]
    .carousel-control-
      &prev,
      &next
        display: none
</style>
