<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: {
        chartdata: [],
    },
    data() {
        return {
            chartData: {
                labels: ['Draft', 'Pending', 'Approved', 'Rejected'],
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
                        data: this.chartdata,
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
