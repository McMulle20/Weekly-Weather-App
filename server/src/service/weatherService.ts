import dotenv from 'dotenv';
dotenv.config();
console.log('API_BASE_URL:', process.env.API_BASE_URL);
console.log('API_KEY:', process.env.API_KEY);

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor( // Reorganized class weather object to better structure incoming api
    public tempF: number, // Fahrenheit temperature, rounded to no decimals
    public humidity: number, // Humidity percentage
    public windSpeed: number, // Wind speed in m/s
    public city: string, // City name
    public date: string, // Date when the weather data was recorded
    public icon: string, // Weather icon code (e.g., '04n')
    public iconDescription: string, // Weather icon description (e.g., 'overcast clouds')
  ) {}
}

// Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  // Removed cityname as it was redundant

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';  // Use an environment variable for the API base URL
    this.apiKey = process.env.API_KEY || '';  // Processed by dotenv for security reasons
    console.log(this.baseURL); // Log the base URL
    console.log(this.apiKey);   // Log the API key
  }

  // TODO: Create buildGeocodeQuery method (Latitude, Longitude) based on city name
  private buildGeocodeQuery(city: string): string { //reincluded geobuild as i forgot about 5dayapi
    return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  } 
  
  // Create buildWeatherQuery method
  // Build query for weather data based on coordinates to handle both forecast and currentWeather
  private buildWeatherQuery(coordinates: Coordinates, isForecast: boolean = false): string {
    const baseUrl = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`;  // Ensure baseURL ends with a slash
    
    if (isForecast) {
      // If isForecast is true, return the 5-day forecast query
      return `${baseUrl}data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
    } else {
      // Default to current weather query
      return `${baseUrl}data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
    } 
  }

  // Create fetchLocationData method using (Geocode) from the API
  // Needed a method for geocode query; returns only the first match instead of mapping all results into an array
  private async fetchLocationData(city: string): Promise<Coordinates | null> {
    const query = this.buildGeocodeQuery(city);
    const response = await fetch(query);
    const data = await response.json();
    if (data.length > 0) {
      return { latitude: data[0].lat, longitude: data[0].lon };
    }
    return null;
  }

  // Create fetchWeatherData method
  // Implement a way to fetch the raw data (current or forecast) since last code didnt have a way to retrieve
  private async fetchWeatherData(coordinates: Coordinates, isForecast: boolean = false): Promise<any> {
    const query = this.buildWeatherQuery(coordinates, isForecast);
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }

  // Parse the weather data to match the required structure for current weather
 // Separating parsing methods to add easier reusability
  private parseCurrentWeather(response: any): Weather {
    const city = response.name;
    const date = new Date(response.dt * 1000).toLocaleDateString();
    const icon = response.weather[0].icon;
    const iconDescription = response.weather[0].description;
    const tempF = Math.round(response.main.temp); // Round to no decimals for simplicity
    const windSpeed = Math.round(response.wind.speed);
    const humidity = response.main.humidity;

    return new Weather(tempF, humidity, windSpeed, city, date, icon, iconDescription);
  }

  // Complete getWeatherForCity method to fetch current and forecast weather
  async getWeatherForCity(city: string): Promise<Weather[]> {
    const coordinates = await this.fetchLocationData(city);
    if (coordinates) {
      // Implement both a way to fetch current weather data
      const currentWeatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(currentWeatherData);

      // And to fetch 5-day forecast data from API
      const forecastData = await this.fetchWeatherData(coordinates, true);
      
      // implents a way to parse the forecast data
      const forecast = forecastData.list.map((data: any) => {
        const city = currentWeather.city; // Use city from current weather
        const date = new Date(data.dt * 1000).toLocaleDateString();
        const icon = data.weather[0].icon;
        const iconDescription = data.weather[0].description;
        const tempF = Math.round(data.main.temp); // Round to no decimals
        const windSpeed = Math.round(data.wind.speed);
        const humidity = data.main.humidity;
        
        return new Weather(tempF, humidity, windSpeed, city, date, icon, iconDescription);
      });

      // Return both current weather and forecast so that it may be taken through clientside
      return [currentWeather, ...forecast];
    }
    return [];
  }
}

export default new WeatherService();
