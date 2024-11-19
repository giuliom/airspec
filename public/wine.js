import {config, API_URL} from './config.js';

function getWine(){
    // Extract the wineId from the URL query parameters
    const urlParams = new URLSearchParams(globalThis.window.location.search);
    const wineId = urlParams.get('id'); // '123' in this case

    if (wineId) {
        fetch(`${config.endpoint}${API_URL}/wine?id=${wineId}`)
            .then(response => {
                response.json()
                .then(data => {
                    displayData(data);
            }). catch(error => {
            console.error(`Invalid json response: ${error}`);
        })
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
    } else {
        console.error("No wineId provided in the URL");
    }
}

function displayData(data) {
    // Select elements in the DOM where data will be displayed
    const wineName = document.querySelector('.wine-details h2');
    const grape = document.querySelector('.wine-details #grape .grape-value');
    const wineTypesList = document.querySelector('.wine-details #types #types-list');
    const winery = document.querySelector('.wine-details #winery .winery-value');
    const wineRegion = document.querySelector('.wine-details #region .region-value');
    const wineCountry = document.querySelector('.wine-details #region .country-value'); 
    const wineAlcoholContent = document.querySelector('.wine-details #alcohol-content .alcohol-value'); 
    const winePrice = document.querySelector('.wine-details #price .price-value'); 
    const wineVolume = document.querySelector('.wine-details #volume .volume-value');
    const stockCount = document.querySelector('.wine-details #count .count-value');

    // Populate the elements with data
    if (wineName) wineName.textContent = data.name;
    if (grape) grape.textContent = ` ${data.grape}`;
    if (wineRegion) wineRegion.textContent = ` ${data.region}`;
    if (wineCountry) wineCountry.textContent = ` ${data.country}`;
    if (wineAlcoholContent) wineAlcoholContent.textContent = ` ${data.abv}%`;
    if (winery) winery.textContent = ` ${data.winery}`;
    if (winePrice) winePrice.textContent = ` $${data.price}`;
    if (wineVolume) wineVolume.textContent = ` ${data.volume.toFixed(2)}`;
    if (stockCount) stockCount.textContent = ` ${data.count}`;

    // Populate wine types (assuming it's an array)
    if (wineTypesList && Array.isArray(data.types)) {
        wineTypesList.innerHTML = ''; // Clear existing types
        data.types.forEach((type) => {
            const listItem = document.createElement('li');
            listItem.textContent = type;
            wineTypesList.appendChild(listItem);
        });
    }
}

getWine();