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
