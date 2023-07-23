document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '5c697a17965f20cb38456219bf568c26'; // Replace this with your OpenWeatherMap API key
  const apiUrl = 'https://restcountries.com/v3.1/all';
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((countries) => {
      const countryCardsDiv = document.getElementById('countryCards');

      countries.forEach((country) => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-4', 'col-sm-12');

        const countryName = country.name.common;
        const capital = country.capital ? country.capital[0] : 'N/A';
        const region = country.region ? country.region : 'N/A';
        const postalCode = country.postalCode
        ? Object.keys(country.postalCode).map((key) => country.postalCode[key]).join(', ')
        : 'N/A';


        

        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        const cardHeader = document.createElement('h5');
        cardHeader.classList.add('card-header');
        cardHeader.textContent = countryName;

        const cardImg = document.createElement('img');
        cardImg.src = country.flags.png;
        cardImg.classList.add('card-img-top');
        cardImg.alt = 'Flag of ' + countryName;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        cardBody.innerHTML = `
          <h5 class="card-title">Capital: ${capital}</h5>
          <p class="card-text">Region: ${region}</p>
          <p class="card-text">Postal Code: ${postalCode}</p>
        <p class="card-text">Latitude: ${country.latlng ? country.latlng[0] : 'N/A'}, Longitude: ${country.latlng ? country.latlng[1] : 'N/A'}</p>`;

        const weatherButton = document.createElement('a');
        weatherButton.href = '#';
        weatherButton.classList.add('btn', 'btn-primary');
        weatherButton.textContent = 'CLICK FOR WEATHER';

        weatherButton.addEventListener('click', () => {
          // Fetch weather data for the country using the OpenWeatherMap API
          const weatherApiParams = `?q=${encodeURIComponent(capital)},${encodeURIComponent(countryName)}&appid=${apiKey}&units=metric`;

          fetch(weatherApiUrl + weatherApiParams)
            .then((response) => response.json())
            .then((weatherData) => {
              const temperature = weatherData.main.temp;
              const conditions = weatherData.weather[0].description;
              alert(
                `Weather Information for ${countryName}:\nTemperature: ${temperature}°C\nConditions: ${conditions}`
              );
            })
            .catch((error) => {
              console.error('Error fetching weather data:', error);
              alert('Failed to fetch weather information.');
            });
        });

        cardBody.appendChild(weatherButton);

        card.appendChild(cardHeader);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        colDiv.appendChild(card);
        countryCardsDiv.appendChild(colDiv);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
});