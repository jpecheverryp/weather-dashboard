// I wrap everything on ready so it waits for the page to load before executing any code
$().ready(function () {

    // Get History from localStorage
    // Using PascalCase for the object inside local storage
    // Using camelCase for the object in javascript
    if (localStorage.getItem('WeatherHistory') === null) {
        var weatherHistory = { cities: ['Atlanta'] };
        localStorage.setItem('WeatherHistory', JSON.stringify(weatherHistory));
    } else {
        weatherHistory = JSON.parse(localStorage.getItem('WeatherHistory'));
    }

    // Target Elements on the screen
    var searchInput = $('#search-input');
    var searchBtn = $('#search-btn');

    // Functions 
    function insertToLocal(city) {
        if (weatherHistory.cities.includes(city) === false) {
            weatherHistory.cities.push(city);
            localStorage.setItem('WeatherHistory', JSON.stringify(weatherHistory));
            console.log(weatherHistory);
        }
    }

    // Click Events
    searchBtn.on('click', function (e) {
        e.preventDefault();
        insertToLocal(searchInput.val());
        searchInput.val('');
    });

});