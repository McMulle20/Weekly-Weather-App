import { Router, type Request, type Response } from 'express';
import fs from 'fs/promises';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => { 
  const { cityName } = req.body;
  console.log('Received cityName:', cityName); // Log the incoming city name

  if (cityName) {
    try {
      const weather = await WeatherService.getWeatherForCity(cityName);
      console.log('Weather data:', weather);
      await HistoryService.addCity(cityName); // Save city to search history
      res.json(weather);
    } catch (error) { 
      console.error(error) // Log the error for debugging
      res.status(500).json({ message: 'Error retrieving weather data' }); 
    }
  } else {
    res.status(400).json({ message: 'City name is required' });
  } 
});

// GET search history at /api/weather/history
router.get('/history', async (_req: Request, res: Response) => {
  try { 
    const history = await HistoryService.getCities();
    res.json(history); 
  } catch (error) { 
    res.status(500).json({ message: 'Error retrieving search history'});
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const id = req.params.id; 
  try { 
    await HistoryService.removeCity(id); 
    res.json('Search history entry deleted');
  } catch (error) { 
    res.status(500).json({ message: 'Error deleting search history entry'});
  } 
});

// Define the /api/weather/history endpoint to read from the JSON file
router.get('/history/file', async (_req: Request, res: Response) => {
  try {
    const data = await fs.readFile('db/searchHistory.json', 'utf8'); // Adjust the path as needed
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reading history data' });
  }
});

export default router;