const Current = document.getElementById('myChart2');
let myChart2;

// Function to fetch current data from the API
async function fetchCurrentData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all'); // Adjust your endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched current data:', data); // Log the fetched data

        // Extract the current data and corresponding timestamps
        const currentData = data.map(entry => entry.current); // Extract current values
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); // Extract and format timestamps

        // Limit to the last 5 data points
        const limitedCurrentData = currentData.slice(-20);
        const limitedTimeData = timeData.slice(-20);

        // Create the chart using fetched data
        createChart2(limitedTimeData, limitedCurrentData);
    } catch (error) {
        console.error('Error fetching current data:', error);
    }
}

// Function to create the chart
function createChart2(timeData, currentData) {
    if (myChart2) {
        myChart2.destroy(); // Destroy the existing chart instance if it exists
    }

    myChart2 = new Chart(Current, {
        type: 'line',
        data: {
            labels: timeData, // Use the fetched time data as labels
            datasets: [{
                label: 'Current Data', // Update the label accordingly
                data: currentData, // Use the fetched current data here
                borderWidth: 1,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // Changed for better visibility
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
                        text: 'Current (A)' // Label for the y-axis
                    }
                }
            }
        }
    });
}

// Fetch current data and create the chart initially
fetchCurrentData();

// Redraw the chart on window resize to ensure proper scaling
window.addEventListener('resize', () => {
    if (myChart2) {
        myChart2.destroy(); // Destroy the existing chart instance
        fetchCurrentData(); // Fetch the data again
    }
});
