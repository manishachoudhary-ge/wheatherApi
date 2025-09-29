

jest.mock('../config', () => ({
  apiKey: 'test-api-key',
}));


import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import WeatherApp from '../components/WeatherApp'
import axios from 'axios'

test('renders input', () => {
  render(<WeatherApp />);
  const inputElement = screen.getByPlaceholderText(/Enter a city.../i);
  expect(inputElement).toBeInTheDocument();
});




test('renders button', () => {
  render(<WeatherApp />);
  const buttonElement = screen.getByRole('button', { name: /Search/i });
  expect(buttonElement).toBeInTheDocument();
});









// Mock axios
jest.mock('axios');

describe('WeatherApp', () => {
  it('fetches and displays weather data when a valid city is entered', async () => {

    const mockWeatherData = {
      name: 'London',
      main: { temp: 20 },
      weather: [{ description: 'clear sky', icon: '01d' }]
    };

    const mockForecastData = {
      list: [
        { dt: 1672531200, main: { temp_min: 18, temp_max: 22 }, weather: [{ icon: '01d', description: 'clear sky' }] },
        { dt: 1672617600, main: { temp_min: 17, temp_max: 21 }, weather: [{ icon: '02d', description: 'partly cloudy' }] },
        { dt: 1672704000, main: { temp_min: 16, temp_max: 20 }, weather: [{ icon: '03d', description: 'cloudy' }] },
        { dt: 1672790400, main: { temp_min: 15, temp_max: 19 }, weather: [{ icon: '04d', description: 'overcast clouds' }] },
        { dt: 1672876800, main: { temp_min: 14, temp_max: 18 }, weather: [{ icon: '04n', description: 'overcast clouds' }] },
      ]
    };

    axios.get.mockResolvedValueOnce({ data: mockWeatherData });
    axios.get.mockResolvedValueOnce({ data: mockForecastData });

    render(<WeatherApp />);

    const input = screen.getByPlaceholderText(/Enter a city.../i);
    fireEvent.change(input, { target: { value: 'London' } });

  
    const button = screen.getByText(/Search/i);
    fireEvent.click(button);

    const tempElement = await screen.findByText(/temperature: 20°C/i);
    expect(tempElement).toBeInTheDocument();

    const nameElement = screen.getByText('London');
    expect(nameElement).toBeInTheDocument();

    const descElement = screen.getByText(/clear sky/i);
    expect(descElement).toBeInTheDocument();
  });
});































// jest.mock('axios')

// test('fetches weather on search', async () => {
//   const mockData = {
//     data: {
//       name: "London",
//       main: { temp: 18 },
//       weather: [{ description: "clear sky", icon: "01d" }]
//     }
//   };
//   axios.get.mockResolvedValueOnce(mockData);

//   render(<WeatherApp />);
  
//   fireEvent.change(screen.getByPlaceholderText(/Enter a city.../i), {
//     target: { value: 'London' }
//   });

//   fireEvent.click(screen.getByRole('button', { name: /Search/i }));

//   await waitFor(() => {
//     expect(screen.getByText(/London/i)).toBeInTheDocument();
//     expect(screen.getByText(/Temperature: 18°C/i)).toBeInTheDocument();
//     expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
//   });
// });





// test('displays error on fetch failure', async () => {
//   axios.get.mockRejectedValueOnce(new Error('City not found'));

//   render(<WeatherApp />);
  
//   fireEvent.change(screen.getByPlaceholderText(/Enter a city.../i), {
//     target: { value: 'InvalidCity' }
//   });

//   fireEvent.click(screen.getByRole('button', { name: /Search/i }));

//   await waitFor(() => {
//     expect(screen.getByText(/City not found/i)).toBeInTheDocument();
//   });
// });


