import { Router } from 'express';
import fs from 'fs/promises';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => { 
  const { cityName } = req.body;
  if (cityName) {
    try {
      const weather = await WeatherService.getWeatherForCity(cityName);
      await HistoryService.addCity(cityName); // Save city to search history
      res.json(weather);
    } catch (error) { 
      res.status(500).send('Error retrieving weather data'); 
    }
  } else {
    res.status(400).send('City name is required');
  } 
});

// GET search history at /api/weather/history
router.get('/history', async (_req, res) => {
  try { 
    const history = await HistoryService.getCities();
    res.json(history); 
  } catch (error) { 
    res.status(500).send('Error retrieving search history');
  }
});

// BONUS: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const id = req.params.id; 
  try { 
    await HistoryService.removeCity(id); 
    res.send('Search history entry deleted');
  } catch (error) { 
    res.status(500).send('Error deleting search history entry');
  } 
});

// Define the /api/weather/history endpoint to read from the JSON file
router.get('/history/file', async (_req, res) => {
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