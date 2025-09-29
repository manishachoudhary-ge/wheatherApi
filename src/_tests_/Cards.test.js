
import { render, screen } from '@testing-library/react';
import Cards from '../components/Cards'; 







test('renders weather card with day, temperature, and icon', () => {
  render(<Cards day="Mon" temp={22} icon="01d" />);

  expect(screen.getByText(/Mon/i)).toBeInTheDocument();

  expect(screen.getByText(/22°C/)).toBeInTheDocument();
  
  const img = screen.getByAltText(/weather icon/i);
  expect(img).toBeInTheDocument();
  expect(img.src).toContain('https://openweathermap.org/img/wn/01d@2x.png');
});































// const mockWeather = {
//   name: 'New York',
//   main: {
//     temp: 21.7,
//   },
//   weather: [
//     {
//       icon: '01d',
//     },
//   ],
// };

// test('renders weather card with city name, temperature, and icon', () => {
//   render(<Cards weather={mockWeather} />);


//   expect(screen.getByText(/New York/i)).toBeInTheDocument();

  
//   expect(screen.getByText(/22°C/)).toBeInTheDocument(); 

  
//   const img = screen.getByAltText(/weather icon/i);
//   expect(img).toBeInTheDocument();
//   expect(img.src).toContain('https://openweathermap.org/img/wn/01d@2x.png');
// });

