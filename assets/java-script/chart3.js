const Power = document.getElementById('myChart3');
let myChart3;

// Function to fetch power data from the API
async function fetchPowerData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all'); // Adjust your endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched power data:', data); // Log the fetched data

        // Extract the power data and corresponding timestamps
        const powerData = data.map(entry => entry.power); // Extract power values
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); // Extract and format timestamps

        // Limit to the last 5 data points
        const limitedPowerData = powerData.slice(-20);
        const limitedTimeData = timeData.slice(-20);

        // Create the chart using fetched data
        createChart3(limitedTimeData, limitedPowerData);
    } catch (error) {
        console.error('Error fetching power data:', error);
    }
}

// Function to create the chart
function createChart3(timeData, powerData) {
    if (myChart3) {
        myChart3.destroy(); // Destroy the existing chart instance if it exists
    }

    myChart3 = new Chart(Power, {
        type: 'line',
        data: {
            labels: timeData, // Use the fetched time data as labels
            datasets: [{
                label: 'Power Data', // Update the label accordingly
                data: powerData, // Use the fetched power data here
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
                        text: 'Power (W)' // Label for the y-axis
                    }
                }
            }
        }
    });
}

// Fetch power data and create the chart initially
fetchPowerData();

// Redraw the chart on window resize to ensure proper scaling
window.addEventListener('resize', () => {
    if (myChart3) {
        myChart3.destroy(); // Destroy the existing chart instance
        fetchPowerData(); // Fetch the data again
    }
});
