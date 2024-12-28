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
  constructor(
    public temperature: number,
    public condition: string,
    public humidity: number,
    public windSpeed: number,
  ) {}
}
// Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || ''; // Use an environment variable for the API key
    console.log(this.baseURL); // Log the base URL
    console.log(this.apiKey);   // Log the API key
    this.cityName = '';
  }

  // Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates[]> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for city: ${this.cityName}, Status: ${response.status}`);
    }

    const locationData = await response.json();

    return locationData.map((data: any) => ({
      latitude: data.lat,
      longitude: data.lon,
    }));
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    if (locationData.length === 0) {
      throw new Error('No location data found');
    }
    return {
      latitude: locationData[0].latitude,
      longitude: locationData[0].longitude,
    };
  }

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for city: ${this.cityName}, Status: ${response.status}`);
    }

    const data = await response.json(); 
    return {
      city: this.cityName,
      date: new Date(data.dt * 1000).toLocaleDateString(),
      icon: data.weather[0].icon,
      iconDescription: data.weather[0].description,
      tempF: (data.main.temp * 9) / 5 + 32, // Convert to Fahrenheit
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
    };
  } 

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();

    return await this.fetchWeatherData(coordinates);
  };
}

export default new WeatherService();
