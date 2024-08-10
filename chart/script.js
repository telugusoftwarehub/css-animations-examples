document.addEventListener('DOMContentLoaded', function() {
const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
type: 'line', // Change this to 'bar', 'pie', etc. for different chart types
data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Monthly Sales',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
},
options: {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return 'Sales: ' + tooltipItem.raw;
                }
            }
        }
    }
}
});
});
