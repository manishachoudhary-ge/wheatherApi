import React from 'react'

function Cards({weather}) {
  // console.log(weather)
  return (
    <div className='card'> 
    <div >
        <h3>{weather.name}</h3>
        {<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
            />}
        <p>{Math.round(weather.main.temp)}°C</p>
        </div>
    </div>

  )
}

export default Cards