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

    // ------------------  Functions  -------------------------
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

    function getFormatedDate(){
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return `(${month}/${day}/${year})`;
    }

    function callAPI(city) {
        var apiKey = '16265bff2120f2467d9ec41ab15065e7';
        var urlQuery = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';
        $.ajax({
            url: urlQuery,
            method: 'GET'
        }).then(function (data) {
            console.log(data);
            $('#current-weather').empty();
            // City Name and date
            $('#current-weather').append($('<h2>').text(data.name + ' ' + getFormatedDate()).addClass('card-title').css('display', 'inline') );
            
            // Icon
            var iconURL = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
            
            var iconElement = $('<img>').attr('src', iconURL).css('display', 'inline');
            iconElement.css('margin-left', '1rem');
            iconElement.attr('alt', data.weather[0].description);
            $('#current-weather').append(iconElement);

            $('#current-weather').append($('<p>').text('Temperature: ' + data.main.temp + '°').addClass('card-text'));
            $('#current-weather').append($('<p>').text('Humidity: ' + data.main.humidity + '%').addClass('card-text'));
            $('#current-weather').append($('<p>').text('Wind Speed: ' + data.wind.speed + 'MPH').addClass('card-text'));
        })
    }

    // Click Events
    searchBtn.on('click', function (e) {
        e.preventDefault();
        var city = searchInput.val();
        // We insert the city that was searched into the localStorage
        insertToLocal(searchInput.val());
        // Empties input box to be used again
        searchInput.val('');
        // Displays the recent searches
        displayRecentCities();
        callAPI(city)
    });

    displayRecentCities();
});