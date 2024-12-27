import { Router, Request, Response} from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// TODO: GET weather data from city name
// TODO: save city to search history
router.post('/', async (req: Request, res: Response) => { 
  const { city } = req.body;
  if (city) {
    try {
      const weather = await WeatherService.getWeatherForCity(city);
      await HistoryService.addCity(city); // Save city to search history
      res.json(weather);
    } catch (error) { 
      res.status(500).send('Error retrieving weather data'); 
    } } else {
      res.status(400).send('City name is required');
    } 
  });

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try { 
    const history = await HistoryService.getCities();
    res.json(history); 
  } catch (error) { 
    res.status(500).send('Error retrieving search history');
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params; 
  try { 
    await HistoryService.removeCity(id); 
    res.send('Search history entry deleted');
  } catch (error) { 
    res.status(500).send('Error deleting search history entry');
  } 
});

export default router;
