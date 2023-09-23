//fetching map API
var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 15
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// create the marker
const customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: ["50px", "50px"],
    // iconAnchor: [anchorX, anchorY], 
});

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fetchData();
    }
});

const btn = document.querySelector('#btn')
btn.addEventListener('click', fetchData);

function fetchData() {
    const input = document.querySelector('#input');
    const ipAddress = document.querySelector('#ipAddress');
    const location = document.querySelector('#location');
    const timezone = document.querySelector('#timezone');
    const isp = document.querySelector('#isp');


    const apiKey = "at_5CQsdrZYnEhCR6bKkt60gQlz5rWTV"; // Replace with your actual API key
    const inputValue = input.value;

    // Check if the input is an IP address or domain
    const isIpAddress = /^\d+\.\d+\.\d+\.\d+$/.test(inputValue);

    // Create the API URL based on the input
    let apiUrl;
    if (isIpAddress) {
        apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${inputValue}`;
    } else {
        apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${inputValue}`;
    }

    // Make the API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Access the relevant data from the response
            ipAddress.textContent = data.ip;
            location.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
            timezone.textContent = `UTC ${data.location.timezone}`;
            isp.textContent = data.isp;
            console.log(data)

            //update map with lat long
            const latitude = data.location.lat;
            const longitude = data.location.lng;

            map.flyTo([latitude, longitude], 15);

            let marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });



}



//     const apiKey = "at_5CQsdrZYnEhCR6bKkt60gQlz5rWTV"; // Replace with your actual API key
