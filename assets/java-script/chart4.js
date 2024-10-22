const Energy = document.getElementById('myChart4');
let myChart4;

// Function to fetch energy data from the API
async function fetchEnergyData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all'); // Adjust your endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched energy data:', data); // Log the fetched data

        // Extract the energy data and corresponding timestamps
        const energyData = data.map(entry => entry.energy); // Extract energy values
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); // Extract and format timestamps

        // Limit to the last 5 data points
        const limitedEnergyData = energyData.slice(-20);
        const limitedTimeData = timeData.slice(-20);

        // Create the chart using fetched data
        createChart4(limitedTimeData, limitedEnergyData);
    } catch (error) {
        console.error('Error fetching energy data:', error);
    }
}

// Function to create the chart
function createChart4(timeData, energyData) {
    if (myChart4) {
        myChart4.destroy(); // Destroy the existing chart instance if it exists
    }

    myChart4 = new Chart(Energy, {
        type: 'line',
        data: {
            labels: timeData, // Use the fetched time data as labels
            datasets: [{
                label: 'Energy Data', // Update the label accordingly
                data: energyData, // Use the fetched energy data here
                borderWidth: 1,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Changed for better visibility
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
                        text: 'Energy (Wh)' // Label for the y-axis
                    }
                }
            }
        }
    });
}

// Fetch energy data and create the chart initially
fetchEnergyData();

// Redraw the chart on window resize to ensure proper scaling
window.addEventListener('resize', () => {
    if (myChart4) {
        myChart4.destroy(); // Destroy the existing chart instance
        fetchEnergyData(); // Fetch the data again
    }
});
