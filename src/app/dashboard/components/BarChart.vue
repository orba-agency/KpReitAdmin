<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: {
        barlabel: [],
        bartotal: [],
    },
    data() {
        return {
            chartData: {
                labels: this.barlabel,
                datasets: [
                    {
                        label: 'Bar Chart',
                        borderWidth: 1,
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255,99,132,1)',
                        ],
                        pointBorderColor: '#2554FF',
                        data: this.bartotal,
                    },
                ],
            },
            options: {
                legend: {
                    display: true,
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    },
}
</script>
