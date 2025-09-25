import React from 'react';
import axios from 'axios';
import {render, screen, waitFor }  from  '@testing-library/react';
import WeatherApp from '../components/WeatherApp';
jest.mock('axios');

 describe('WeatherApp', () =>{
    it('should display fetched data on successful API call', async() =>{
      const mockData = { id: 1, name: 'Test User'};

      axios.get.mockResolvedValue({data: mockData});

    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockData.name}`)).toBeInTheDocument();
    });
      it('should display an error mesage on failed  API call', async ()=>{
         axios.get.mocjRejectedValue(new Error('Failed to fetch data'));

         render(<WeatherApp />)

         await waitFor(()=>{
            expect(screen.getByText(/Error: Failed to fetch data/i)).toBeIntheDocument();
         });
      })


    });
   //  expect(axios.get).toHaveBeenCalledWith('');

   //  const linkElement = screen.getByText(/vite \+ React/i);
   //  expect(linkElement).toBeInTheDocument();
 })
