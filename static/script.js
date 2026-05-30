let chart;

async function loadTrafficData() {

    const response = await fetch('/traffic_data');

    const data = await response.json();

    let tableBody = document.getElementById("trafficTable");

    tableBody.innerHTML = "";

    let totalVehicles = 0;

    let maxVehicles = 0;

    let hotspotRoad = "";
    let peakHour = "";

    let roadNames = [];

    let vehicleCounts = [];
    let hours = [];

    data.forEach(item => {

        totalVehicles += item.vehicles;

        if(item.vehicles > maxVehicles){

            maxVehicles = item.vehicles;

            hotspotRoad = item.road;

            peakHour = item.hour;
        }

        roadNames.push(item.road);

        vehicleCounts.push(item.vehicles);
        hours.push(item.hour + ":00");

        let row = `
            <tr>
                <td>${item.road}</td>
                <td>${item.vehicles}</td>
                <td>${item.congestion}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    document.getElementById("totalVehicles").innerText = totalVehicles;

    document.getElementById("hotspot").innerText = hotspotRoad;
    document.getElementById("peakHour").innerText = peakHour + ":00";

    updateChart(hours, vehicleCounts);
}

function updateChart(labels, data){

    const ctx = document.getElementById('trafficChart');

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: 'bar',

        data: {

            labels: labels,

            datasets: [{
                label: 'Vehicle Count',
                data: data,
                borderWidth: 1
            }]
        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

loadTrafficData();

setInterval(loadTrafficData, 5000);