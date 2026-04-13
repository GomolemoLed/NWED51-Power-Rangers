SADC MorphoAdventures
NWED513 Web Development 1 Group Assignment 2026Group: ICT Power Rangers 
Institution: Sol Plaatje University

About the Website
SADC MorphoAdventures is a travel information website designed to help financially independent individuals. Such as young professionals, entrepreneurs, and middle-to-high-income earners. Plan trips across Southern African Development Community (SADC) countries more efficiently.

The website brings together destination information, live weather data, currency conversion, and trusted booking platforms in one place, removing the need to visit multiple websites when planning a trip.

Website Pages

Landing (index.html) Entry point. Overview of the website and links to Login and About.

Login (login.html) Register a new account or log in with an existing one

Home (home.html) Main protected page. Access all travel tools after logging in.

About (about.html) Purpose statement, customer comments, and social media links.

Features

Destination Search - Search for a SADC country and view its details

SADC Countries - Browse 5 SADC country cards with live data from REST Countries API

Weather Checker - Enter any city and get live weather conditions

Currency Converter - Convert between 150+ currencies using live exchange rates

Travel Details Form - Enter trip details and get a personalised trip summary with booking links

Trusted Booking Platforms - Direct links to Skyscanner, Expedia, and Booking.com

Authentication - Register and login system using browser localStorage

Offline Detection - Banner alerts the user when there is no internet connection

APIs Used

REST Countries - Fetches country data (capital, population, currency, languages)
Endpoint: https://restcountries.com/v3.1/name/{country}

OpenWeatherMap - Fetches live weather data for any city
Endpoint: https://api.openweathermap.org/data/2.5/weather

ExchangeRate API - Fetches live currency codes and conversion rates
Endpoint: https://v6.exchangerate-api.com/v6/{key}/pair/{from}/{to}

Unsplash API - Fetches high-quality travel images for SADC countries
Endpoint: https://api.unsplash.com/search/photos?query={country}

Project Structure

index.html          Landing page
login.html          Login and registration page
home.html           Protected home page (travel tools)
about.html          About page
README.md           Project documentation
css/
style.css           All styling (responsive, Flexbox, Grid)
js/
config.js           API keys configuration
script.js           All website functionality
auth.js             Authentication logic

How to Run
No server or installation is required. The website runs entirely in the browser.

Clone the repository:
git clone https://github.com/GomolemoLed/NWED51-Power-Rangers.git

Open the project folder in VS Code

Open index.html with the Live Server extension
(Right-click index.html and select Open with Live Server)

The website will open in your browser at http://127.0.0.1:5500

Environment Configuration
API keys are stored in js/config.js. Before running the website, make sure this file contains valid keys:

const CONFIG = {
  OPENWEATHER_KEY: "your_openweathermap_key_here",
  EXCHANGERATE_KEY: "your_exchangerate_key_here",
  UNSPLASH_KEY: "your_unsplash_key_here"
};

Tools Used
Visual Studio Code - Code editor
Live Server (VS Code extension) - Local development server
Git - Version control
GitHub - Remote repository and submission
Chrome DevTools - Testing and debugging
Google Fonts (Poppins) - Typography

Technologies
HTML5 - Semantic page structure
CSS3 - Responsive design using Flexbox and Grid
JavaScript (ES6+) - Async/await, fetch API, DOM manipulation, localStorage

Group Members
Amandla Mthethwa 202610014@spu.ac.za
Asaneliswe Zikalala 202604069@spu.ac.za
Boledi Peatunia Mankge 202608735@spu.ac.za
Kamogelo Shawn Sekoto 202607485@spu.ac.za
Koketso Ramoroka 202603139@spu.ac.za
Mokgethwa Moses Moemi 202602751@spu.ac.za
Ofentse Africa Modupe 202649044@spu.ac.za
Olwethu Lwandle Gwambi 202556624@spu.ac.za
Omphile Gomolemo Ledibane 202605446@spu.ac.za
Phetolo Phokane 202609840@spu.ac.za

License
This project was developed for academic purposes at Sol Plaatje University.
© 2026 ICT Power Rangers