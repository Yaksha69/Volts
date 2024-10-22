document.addEventListener('DOMContentLoaded', () => {
    const voltageDiv = document.getElementById('voltage');
    const currentDiv = document.getElementById('current');
    const powerDiv = document.getElementById('power');
    const energyDiv = document.getElementById('energy');

    // Fetch sensor data from the backend
    fetch('http://localhost:7000/api/v1/data/all')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latestData = data[data.length - 1];
                voltageDiv.textContent = latestData.voltage;
                currentDiv.textContent = latestData.current;
                powerDiv.textContent = latestData.power;
                energyDiv.textContent = latestData.energy;
            } else {
                voltageDiv.textContent = 'No data';
                currentDiv.textContent = 'No data';
                powerDiv.textContent = 'No data';
                energyDiv.textContent = 'No data';
            }
        })
        .catch(error => console.error('Error fetching sensor data:', error));
});
