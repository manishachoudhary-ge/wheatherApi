// import React from 'react';
// import axios from 'axios';
// import {render, screen, waitFor }  from  '@testing-library/react';
// import WeatherApp from '../components/WeatherApp';
// jest.mock('axios');

//  describe('WeatherApp', () =>{
//     it('should display fetched data on successful API call', async() =>{
//       const mockData = { id: 1, name: 'Test User'};

//       axios.get.mockRejectedValue(new Error('Failed to fetch data'));

//     render(<WeatherApp />);

//     await waitFor(() => {
//       expect(screen.getByText(`Name: ${mockData.name}`)).toBeInTheDocument();
//     });
//       it('should display an error mesage on failed  API call', async ()=>{
//          axios.get.mocjRejectedValue(new Error('Failed to fetch data'));

//          render(<WeatherApp />)

//          await waitFor(()=>{
//             expect(screen.getByText(/Error: Failed to fetch data/i)).toBeIntheDocument();
//          });
//       })


//     });
   
//  })



//  import react from 'react';
// import {fireEvent, render, renderHook, screen} from '@testing-library/react';
// import WeatherApp from '../components/WeatherApp';

// test("check for input box", ()=>{
//   render(<WeatherApp />)
//   // const text = screen.getByText(/Enter a city/i);
//   // let checkInput = screen.getByRole("textbox");
//   // expect(checkInput).toBeInTheDocument();
//   let checkInputPlaceholder = screen.getByPlaceholderText("Enter a city...")
//   expect(checkInputPlaceholder).toBeInThedocument();

//   // expect(text).toBeTheDocument();
// });



// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import wheather from '../components/WeatherApp';

// describe('wheather', () => {
//   it('renders the correct text', () => {
//     render(<wheather />);
//     expect(screen.getByText('Enter a city...')).toBeInTheDocument();
//   });
// });











// test("on change event testing", ()=>{
//   render(<WeatherApp />)
//   let input = screen.getByRole("textbox");
//   fireEvent.change(input, {target:{value: "wheather"}});
//   expect(input.value).toBe("data");
// })









// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import { fetchWeather } from '../components/WeatherApp'; 

// describe('fetchWeather', () => {
//   let mock;
//   const mockCity = 'London';
//   const mockApiKey = 'fake-api-key';


//   const originalEnv = process.env;
//   beforeAll(() => {
//     process.env.VITE_WEATHER_API_KEY = mockApiKey;
//     mock = new MockAdapter(axios);
//   });

//   afterEach(() => {
//     mock.reset();
//   });

  
//   afterAll(() => {
//     process.env = originalEnv;
//   });

//   it('should call setWeather with the fetched data on a successful API call', async () => {
//     const mockWeatherResponse = {
//       weather: [{ main: 'Clear' }],
//       main: { temp: 20 },
//     };
//     const setWeather = jest.fn();
//     const setError = jest.fn();

//     mock
//       .onGet(
//         `https://api.openweathermap.org/data/2.5/weather?q=${mockCity}&appid=${mockApiKey}&units=metric`
//       )
//       .reply(200, mockWeatherResponse);

//     await fetchWeather(mockCity, setWeather, setError);

//     expect(setWeather).toHaveBeenCalledWith(mockWeatherResponse);
//     expect(setError).toHaveBeenCalledWith('');
//   });
// });






import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import WeatherApp from '../components/WeatherApp'
import axios from 'axios'

test('renders input and button', () => {
  render(<WeatherApp />);
  const inputElement = screen.getByPlaceholderText(/Enter a city.../i);
  const buttonElement = screen.getByRole('button', { name: /Search/i });
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});






import userEvent from '@testing-library/user-event'

test('allows user to type in the input', async () => {
  render(<WeatherApp />);
  const inputElement = screen.getByPlaceholderText(/Enter a city.../i);
  await userEvent.type(inputElement, 'London');
  expect(inputElement).toHaveValue('London');
});





jest.mock('axios')

test('fetches weather on search', async () => {
  const mockData = {
    data: {
      name: "London",
      main: { temp: 18 },
      weather: [{ description: "clear sky", icon: "01d" }]
    }
  };
  axios.get.mockResolvedValueOnce(mockData);

  render(<WeatherApp />);
  
  fireEvent.change(screen.getByPlaceholderText(/Enter a city.../i), {
    target: { value: 'London' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Search/i }));

  await waitFor(() => {
    expect(screen.getByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 18°C/i)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  });
});





test('displays error on fetch failure', async () => {
  axios.get.mockRejectedValueOnce(new Error('City not found'));

  render(<WeatherApp />);
  
  fireEvent.change(screen.getByPlaceholderText(/Enter a city.../i), {
    target: { value: 'InvalidCity' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Search/i }));

  await waitFor(() => {
    expect(screen.getByText(/City not found/i)).toBeInTheDocument();
  });
});
