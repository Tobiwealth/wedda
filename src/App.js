import React, {useState} from 'react';
import './App.css';

function App() {
  const API_KEY = "2b80c8057eaf1cd4148a9e20b387f5ff";
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  
  const onInputChange = (event) => {
    setQuery(event.target.value);
  }

  const onButtonClick = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(answer => setData(answer));
    setQuery("");
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  const timeData = timeConverter(data.dt);

  return (
    <div className="App">
      <div className='searchbar'>
        <input onChange={onInputChange} value={query} type="search" placeholder="Enter your city" className="search"/>
        <button onClick={onButtonClick} >search</button>
      </div>
      { (typeof data.main != "undefined") ? (
        <div className='weather__info'>
          <div className="location">
            <div className="name__of__city">{data.name},{data.sys.country}</div>
            <div className='border'></div>
            <div className="date">{timeData}</div>
          </div>
          <div className="temperature">
            <div className="temp__value">{Math.round(data.main.temp)}°C</div>
            <div className="temp__icon">
              <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather Icon" />
            </div>
          </div>
          <div className="type__of__temp">{data.weather[0].main}</div>
        </div>
      ) : (<h1 style={{fontSize:'2rem',padding:'4rem', margin:'2rem'}}>Enter a valid city to check the weather information</h1>)}
      <div className='footer'>&copy;Tobiwealth</div>
    </div>
  );
}

export default App;
