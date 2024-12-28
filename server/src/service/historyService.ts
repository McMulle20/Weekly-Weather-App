
import { promises as FileSystem } from 'fs'; // Ensure this import is present
import { v4 as uuidv4 } from 'uuid'; // Ensure this import is present

// Define a City class with name and id properties
class City {
  cityName: string;
  id: string;

  constructor(cityName: string, id: string) {
    this.cityName = cityName;
    this.id = id;
  }
}

// Complete the HistoryService class
class HistoryService {
  // Define a read method that reads from the searchHistory.json file
  private async read(): Promise<string> {
    return await FileSystem.readFile('db/searchHistory.json', {
      flag: 'a+', // Use 'r+' to read and write
      encoding: 'utf8',
    });
  }

  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await FileSystem.writeFile(
      'db/searchHistory.json',
      JSON.stringify(cities, null, '\t')
    );
  }

  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const data = await this.read();
      return data ? JSON.parse(data).map((cityData: any) => new City(cityData.cityName, cityData.id)) : [];
    } catch (err) {
      console.error('Error reading search history');
      return []; // Return an empty array if there is an error
    }
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<City> {
    if (!cityName) {
      throw new Error('City name cannot be blank!');
    }

    const newCity: City = new City(cityName, uuidv4()); // Creates a new city with a unique id

    const cities = await this.getCities(); // Gets all cities
    cities.push(newCity); // Adds the new city
    await this.write(cities); // Writes back to the file

    return newCity; // Return the newly added city
  }

  // BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter((city) => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
