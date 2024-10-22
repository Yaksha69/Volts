const Voltage = document.getElementById('myChart');
let myChart;

// Function to fetch sensor data from the API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all'); // Adjust your endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data

        // Extract the voltage data and corresponding timestamps
        const voltageData = data.map(entry => entry.voltage); // Extract voltage values
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); // Extract and format timestamps

        // Limit to the last 5 data points
        const limitedVoltageData = voltageData.slice(-20);
        const limitedTimeData = timeData.slice(-20);

        // Create the chart using fetched data
        createChart(limitedTimeData, limitedVoltageData);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}

// Function to create the chart
function createChart(timeData, voltageData) {
    if (myChart) {
        myChart.destroy(); // Destroy the existing chart instance if it exists
    }

    myChart = new Chart(Voltage, {
        type: 'line',
        data: {
            labels: timeData, // Use the fetched time data as labels
            datasets: [{
                label: 'Voltage Data', // Update the label accordingly
                data: voltageData, // Use the fetched voltage data here
                borderWidth: 1,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Changed for better visibility
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time' // Label for the x-axis
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage (V)' // Label for the y-axis
                    }
                }
            }
        }
    });
}

// Fetch data and create the chart initially
fetchData();

// Redraw the chart on window resize to ensure proper scaling
window.addEventListener('resize', () => {
    if (myChart) {
        myChart.destroy();
        fetchData(); 
    }
});
