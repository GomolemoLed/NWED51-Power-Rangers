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
