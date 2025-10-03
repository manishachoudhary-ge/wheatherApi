import React from 'react';

function Cards({ day, icon, temp }) {
  return (
    <div className="card">
      <p className='CardDy'>{day}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
        style={{ width: '40px', height: '40px'}}
      />
      <p>{temp}°C</p>
    </div>
  );
}

export default Cards;













// import React from 'react'

// function Cards({weather}) {
//   return (
//     <div className='card'> 
//     <div >
//         <h3>{weather.name}</h3>
//         {<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        
//                 alt="weather icon"
//             />}
//         <p>{Math.round(weather.main.temp)}°C</p>
//         </div>
//     </div>

//   )
// }

// export default Cards
