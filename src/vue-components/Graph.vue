<script>
  import CommonMethods from "./CommonMethods";
  import { Line, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins

  export default {
    name: 'Graph',
    mixins: [reactiveProp],
    props: ['options', 'yTicks', 'height'],
    extends: Line,
    data() {
      return {
        info: null,
      }
    },
    mounted() {
      this.renderChart(this.chartData, {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        datasets: [
          {
            label: 'Тестовые данные',
            backgroundColor: '#f87979',
            data: this.chartdata
          }
        ],
        responsive: true,
        height: this.height,
        scales: {
          xAxes: [{
            gridLines: {
              display: true
            }
          }],
              yAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              min: this.yTicks.min,
              max: this.yTicks.max,
            }
          }]
        }
      });
    },
  }
</script>
