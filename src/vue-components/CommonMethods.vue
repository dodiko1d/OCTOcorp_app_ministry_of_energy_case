<script>
    export default {
        name: "CommonMethods",
        methods: {
          getStaticFilePath(staticFilePath) {
            return require(process.env.VUE_APP_STATICPATH + staticFilePath);
          },
          staticImagesDataDecorator(imagesData) {
            return imagesData
              .map(element => {
              return {
                ...element,
                src: this.getStaticFilePath(element.src),
              }
            })
          },
          setMobileVhVariable() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
          }
        }
    }
</script>
