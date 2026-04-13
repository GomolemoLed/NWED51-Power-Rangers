// Array of 5 SADC countries with static travel info and image URLs
const sadcCountries = [
  {
    name: "South Africa",
    known: "Table Mountain, Kruger National Park",
    bestTime: "May - September",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600"
  },
  {
    name: "Botswana",
    known: "Okavango Delta, wildlife safaris",
    bestTime: "May - October",
    image: "https://images.unsplash.com/photo-1516799175873-1d0a42e4a668?w=600"
  },
  {
    name: "Zimbabwe",
    known: "Victoria Falls, Great Zimbabwe ruins",
    bestTime: "April - October",
    image: "https://images.unsplash.com/photo-1627347456206-d3df7d8484b0?w=600"
  },
  {
    name: "Namibia",
    known: "Namib Desert, Sossusvlei dunes",
    bestTime: "May - October",
    image: "https://images.unsplash.com/photo-1711963071489-b72f3b2cde2a?w=600"
  },
  {
    name: "Mozambique",
    known: "Beautiful beaches, Indian Ocean",
    bestTime: "April - November",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600"
  }
];

// Trims whitespace and converts a string to lowercase for comparison
function normaliseText(value) {
  return value.trim().toLowerCase();
}

// Generates Booking.com, Skyscanner, and Expedia links for a given destination
function getBookingLinks(destination) {
  const encodedDestination = encodeURIComponent(destination);

   return {
    hotels: `https://www.booking.com/searchresults.html?ss=${encodedDestination}`,
    flights: `https://www.skyscanner.net/transport/flights-to/${encodedDestination}`,
    packages: `https://www.expedia.com/Hotel-Search?destination=${encodedDestination}`
  };
}

// Builds the HTML markup for a country card using static data and REST Countries API data
function buildCountryMarkup(country) {
  const capital = country.apiData?.capital?.[0] || "N/A";
  const population = country.apiData?.population?.toLocaleString() || "N/A";
  const currency = country.apiData?.currencies
    ? ${Object.values(country.apiData.currencies)[0]?.name} (${Object.keys(country.apiData.currencies)[0]})
    : "N/A";
  const language = country.apiData?.languages
    ? Object.values(country.apiData.languages).join(", ")
    : "N/A";
  const bookingLinks = getBookingLinks(country.name);

  return `
    <img src="${country.image}" alt="${country.name} landscape" />
    <h3>${country.name}</h3>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Currency:</strong> ${currency}</p>
    <p><strong>Languages:</strong> ${language}</p>
    <p><strong>Known for:</strong> ${country.known}</p>
    <p><strong>Best time to visit:</strong> ${country.bestTime}</p>
    <div class="quick-links">
      <a href="${bookingLinks.hotels}" target="_blank" rel="noopener">Hotels on Booking.com</a>
      <a href="${bookingLinks.flights}" target="_blank" rel="noopener">Flights on Skyscanner</a>
      <a href="${bookingLinks.packages}" target="_blank" rel="noopener">Packages on Expedia</a>
    </div>
  `;
}

// Fetches country data from the REST Countries API by country name
async function fetchCountryData(countryName) {
  try {
    const response = await fetch(
      https://restcountries.com/v3.1/name/${countryName}?fullText=true
    );

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(Failed to fetch data for ${countryName}:, error);
    return null;
  }
}

// Fetches REST Countries API data for all SADC countries and renders them as cards
async function displayCountries() {
  const container = document.getElementById("countries-container");

  if (!container) {
    return;
  }

  if (!navigator.onLine) {
    container.innerHTML =
      "<p>No internet connection. Country information cannot load right now.</p>";
    return;
  }

  container.innerHTML = "<p>Loading countries...</p>";

  const cards = await Promise.all(
    sadcCountries.map(async (country) => {
      const apiData = await fetchCountryData(country.name);
      return { ...country, apiData };
    })
  );

  container.innerHTML = "";

  cards.forEach(({ name, known, bestTime, image, apiData }) => {
    const card = document.createElement("div");
    card.className = "country-card";
    card.innerHTML = buildCountryMarkup({ name, known, bestTime, image, apiData });
    container.appendChild(card);
  });

  if (!cards.length) {
    container.innerHTML = "<p>No country data is available right now.</p>";
  }
}

// Searches the sadcCountries array for a match and fetches its REST Countries API data
async function searchDestination() {
  const destinationInput = document.getElementById("destination-input");
  const resultBox = document.getElementById("search-result");

  if (!destinationInput || !resultBox) {
    return;
  }

  const query = normaliseText(destinationInput.value);

  if (!query) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>Please enter a destination to search for.</p>";
    return;
  }

  const matchedCountry = sadcCountries.find((country) =>
    normaliseText(country.name).includes(query)
  );

  if (!matchedCountry) {
    resultBox.style.display = "block";
    resultBox.innerHTML =
      "<p>Destination not found in the current SADC list. Try South Africa, Botswana, Zimbabwe, Namibia, or Mozambique.</p>";
    return;
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = "<p>Searching destination...</p>";

  let apiData = null;

  if (navigator.onLine) {
    apiData = await fetchCountryData(matchedCountry.name);
  }

  resultBox.innerHTML = `
    <div class="country-card search-card">
      ${buildCountryMarkup({ ...matchedCountry, apiData })}
    </div>
  `;
}
  
// Fetches current weather for a city using the OpenWeatherMap API
async function getWeather() {
  const cityInput = document.getElementById("city-input");
  const resultBox = document.getElementById("weather-result");

  if (!cityInput || !resultBox) {
    return;
  }

  const city = cityInput.value.trim();

  if (!city) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  if (!navigator.onLine) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>No internet connection.</p>";
    return;
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = "<p>Loading...</p>";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${CONFIG.OPENWEATHER_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    resultBox.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p><strong>Temperature:</strong> ${data.main.temp} degrees C</p>
      <p><strong>Feels like:</strong> ${data.main.feels_like} degrees C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultBox.innerHTML = "<p>City not found. Please try again.</p>";
  }
}

// Fetches the list of supported currency codes from the ExchangeRate API and populates both dropdowns
async function loadCurrencies() {
  const fromSelect = document.getElementById("from-currency");
  const toSelect = document.getElementById("to-currency");

  if (!fromSelect || !toSelect) {
    return;
  }

  if (!navigator.onLine) {
    fromSelect.innerHTML = "<option>No internet connection</option>";
    toSelect.innerHTML = "<option>No internet connection</option>";
    return;
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${CONFIG.EXCHANGERATE_KEY}/codes`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to load currencies");
    }

    const data = await response.json();
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    data.supported_codes.forEach(([code, name]) => {
      fromSelect.innerHTML += `<option value="${code}">${code} - ${name}</option>`;
      toSelect.innerHTML += `<option value="${code}">${code} - ${name}</option>`;
    });

    fromSelect.value = "USD";
    toSelect.value = "ZAR";
  } catch (error) {
    console.error("Failed to load currencies:", error);
    fromSelect.innerHTML = "<option>Failed to load</option>";
    toSelect.innerHTML = "<option>Failed to load</option>";
  }
}

