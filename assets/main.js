// I wrap everything on ready so it waits for the page to load before executing any code
$().ready(function () {

    // Get History from localStorage
    // Using PascalCase for the object inside local storage
    // Using camelCase for the object in javascript
    if (localStorage.getItem('WeatherHistory') === null) {
        var weatherHistory = { cities: [] };
        localStorage.setItem('WeatherHistory', JSON.stringify(weatherHistory));
    } else {
        weatherHistory = JSON.parse(localStorage.getItem('WeatherHistory'));
    }

    // Target Elements of Page
    var searchInput = $('#search-input');
    var searchBtn = $('#search-btn');
    var citiesList = $('#cities-list');

    // Functions 
    // This function checks if a city is in saved in the local Storage, then saves it if it's not included
    function insertToLocal(city) {
        if (weatherHistory.cities.includes(city) === false) {
            weatherHistory.cities.push(city);
            localStorage.setItem('WeatherHistory', JSON.stringify(weatherHistory));
        }
    }
    // This function clears the list of recent searches and 
    // then displays the buttons for each city that is stored in the local storage 
    function displayRecentCities() {
        citiesList.empty();
        weatherHistory.cities.forEach(element => {
            var currentCity = $('<div>').text(element);
            currentCity.addClass(['list-group-item', 'list-group-item-action']);
            currentCity.attr('data-city', element);
            citiesList.append(currentCity);
        });
    }

    // Click Events
    searchBtn.on('click', function (e) {
        e.preventDefault();
        // We insert the city that was searched into the localStorage
        insertToLocal(searchInput.val());
        // Empties input box to be used again
        searchInput.val('');
        // Displays the recent searches
        displayRecentCities();
    });

    displayRecentCities();
});