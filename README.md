# Challenge09

## Description
This project leverages the OpenWeather API to streamline server-side data retrieval, delivering weather information seamlessly to the client side for display on a deployed website hosted on Render. The application features a visually appealing and user-friendly design, enabling users to easily access detailed weather information for any city, including a 5-day forecast. Additionally, the app stores users' search history, allowing for quick access to previously searched cities or the option to delete entries as desired.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Steps to install and set up your project:
1. Ensure you have the following:
   Node.js: You can download and install it from https://nodejs.org/.
   NPM: This is installed automatically with Node.js.
   Express: A web framework for Node.js used to build the back-end server 
   Dotenv: Manages environment variables (API Keys) securely. 
   Uuid: A library used to generate unique IDS
   Nodemon: A tools that automatically restarts the server when file changes are detected
   Typescript: Stricter version of JS to help catch errors
   
2. Clone the repository: git clone [link](https://github.com/McMulle20/mod09).

3. Please run "npm install" in the terminal for the required dependencies.

4. Obtain an API key from OpenWeather; in credits there will bea guide      listed to easily navigate said task. Ensure your .env file is added with your API key.

5. Run the application locally using npm run start:dev

## Usage

This is a functional weather dashboard with an intuitive form input system that allows users to search for cities and manage their search history through delete buttons. When a user enters a city name and clicks "Search," the interface updates to display both current weather conditions and a 5-day forecast for the selected city. The city is then added to the search history for quick access.

Each city’s weather data is presented in a well-structured card layout, where the current weather appears in the largest card, and the 5-day forecast is displayed in smaller cards arranged in a row for easy navigation. Each card includes the city name, the date, an icon representing the weather conditions, a description of the weather (shown in the icon's alt tag), the temperature, humidity, and wind speed.

Users can easily switch between cities by searching for a new location, with the ability to delete previously searched cities as needed. The weather dashboard features a user-friendly layout, displaying accurate, up-to-date information that is easy to understand and navigate. Powered by an API, the dashboard is reusable and can be used to check the weather for any city globally.

## Credits

BootCamp Guide and the links provided: 
Xpert Learning Assistant 
https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide
https://coding-boot-camp.github.io/full-stack/render/render-deployment-guide
https://docs.render.com/configure-environment-variables
https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
https://openweathermap.org/forecast5
https://www.youtube.com/watch?v=cGn_LTFCif0(insructional to use POSTMAN)
https://openweathermap.org/forecast5
https://openweathermap.org/forecast5#geocoding


## License

This project is licensed under the MIT License.

---
## How to Contribute

Follow these steps to contribute to the project:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push the branch to your fork (git push origin feature-name).
Submit a pull request. For detailed guidelines on contributing, you can refer to the Contributor Covenant.

## Tests

Render Link: https://modchallenge09-weatherapi.onrender.com
Gif of local Deployment: ![image](https://github.com/user-attachments/assets/d565f0ac-e6fc-4a48-b26f-1f529d404f56)

