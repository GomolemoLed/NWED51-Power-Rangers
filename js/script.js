// ===== SADC COUNTRIES DATA =====
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

// ===== FETCH FROM REST COUNTRIES API =====
async function fetchCountryData(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    if (!response.ok) throw new Error("Country not found");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Failed to fetch data for ${countryName}:`, error);
    return null;
  }
}

// ===== COUNTRY SEARCH =====
let allCards = [];

// ===== DISPLAY COUNTRY CARDS =====
async function displayCountries() {
  const container = document.getElementById("countries-container");
  container.innerHTML = "<p>Loading countries...</p>";

  allCards = await Promise.all(sadcCountries.map(async (country) => {
    const apiData = await fetchCountryData(country.name);
    return { ...country, apiData };
  }));

  renderCards(allCards);
}

function renderCards(cards) {
  const container = document.getElementById("countries-container");
  container.innerHTML = "";

  cards.forEach(({ name, known, bestTime, image, apiData }) => {
    const capital = apiData?.capital?.[0] || "N/A";
    const population = apiData?.population?.toLocaleString() || "N/A";
    const currency = apiData
      ? Object.values(apiData.currencies)[0]?.name + " (" + Object.keys(apiData.currencies)[0] + ")"
      : "N/A";
    const language = apiData
      ? Object.values(apiData.languages).join(", ")
      : "N/A";

    const card = document.createElement("div");
    card.classList.add("country-card");
    card.innerHTML = `
      <img src="${image}" alt="${name} landscape" />
      <h3>${name}</h3>
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Currency:</strong> ${currency}</p>
      <p><strong>Languages:</strong> ${language}</p>
       <p><strong>Known for:</strong> ${known}</p>
      <p><strong>Best time to visit:</strong> ${bestTime}</p>
    `;
    container.appendChild(card);
  });
}

      // ===== WEATHER API =====
async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  const resultBox = document.getElementById("weather-result");

  if (!city) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  // Show loading message
  resultBox.style.display = "block";
  resultBox.innerHTML = "<p>Loading...</p>";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.OPENWEATHER_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Feels like:</strong> ${data.main.feels_like}°C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>City not found. Please try again.</p>";
  }
}

      <p><strong>Known for:</strong> ${known}</p>
      <p><strong>Best time to visit:</strong> ${bestTime}</p>
    `;
    container.appendChild(card);
  });
}
