import React, {useState, useEffect, createRef} from 'react';
import ReactDOM from 'react-dom';
import AlgoliaPlaces from 'algolia-places-react';

import Config from '../config';

const WeatherApp = () => {
  const skycons = new Skycons({color: 'white'});
  const iconCurrent = createRef();

  const [currentTemperature, setCurrentTemperature] = useState({
    time: 0,
    actual: 0,
    feels: 0,
    summary: '',
    icon: '',
  });

  const [dailyWeather, setDailyWeather] = useState([]);

  const [location, setLocation] = useState({
    name: 'Tokyo, Japan',
    lat: 35.6828,
    lng: 139.759,
  });

  const fetchData = () => {
    fetch(`/api/weather?lat=${location.lat}&lng=${location.lng}`)
    .then(response => response.json())
    .then(data => {
      setCurrentTemperature({
        time: data.currently.time,
        actual: Math.round(data.currently.temperature),
        feels: Math.round(data.currently.apparentTemperature),
        summary: data.currently.summary,
        icon: data.currently.icon,
      });

      // get weather for 5 days from tomorrow
      setDailyWeather(data.daily.data.slice(1, 6));

      skycons.add('iconCurrent', data.currently.icon);
      skycons.add('icon1', document.getElementById('icon1').getAttribute('data-icon'));
      skycons.add('icon2', document.getElementById('icon2').getAttribute('data-icon'));
      skycons.add('icon3', document.getElementById('icon3').getAttribute('data-icon'));
      skycons.add('icon4', document.getElementById('icon4').getAttribute('data-icon'));
      skycons.add('icon5', document.getElementById('icon5').getAttribute('data-icon'));
      skycons.play();
    })
  };

  const handleChangeLocation = (suggestion) => {
    setLocation({
      name: `${suggestion.name}, ${suggestion.country}`,
      lat: suggestion.latlng.lat,
      lng: suggestion.latlng.lng,
    });
  };

  const toDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',];

    return days[date.getDay()];
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="text-white mb-8">
      <div className="places-input text-gray-800">
        <AlgoliaPlaces
          placeholder="Choose a city..."
          options={{
            appId: Config.algolia.appId,
            apiKey: Config.algolia.key,
            type: 'city',
            aroundLatLngViaIP: false,
          }}
          onChange={({suggestion}) => handleChangeLocation(suggestion)}
        />
      </div>

      <div
        className="weather-container font-sans w-128 max-w-lg rounded-lg overflow-hidden bg-gray-900 shadow-lg mt-4">

        <div className="current-weather flex items-center justify-between px-6 py-8">
          <div className="flex items-center">
            <div>
              <div>{toDayOfWeek(currentTemperature.time)}</div>
              <div className="text-6xl font-semibold">{currentTemperature.actual}˚C</div>
              <div>Feels like {currentTemperature.feels}˚C</div>
            </div>
            <div className="mx-5">
              <div className="font-semibold">{currentTemperature.summary}</div>
              <div>{location.name}</div>
            </div>
          </div>
          <div>
            <canvas ref={iconCurrent} id="iconCurrent" width="96" height="96"/>
          </div>
        </div>

        <div className="future-weather text-sm bg-gray-800 px-6 py-8 overflow-hidden">
          {dailyWeather.map((day, index) => (
            <div className={'flex items-center' + (index > 0 ? ' mt-8' : '')} key={day.time}>
              <div className="w-1/6 text-lg text-gray-200">{toDayOfWeek(day.time)}</div>
              <div className="w-4/6 px-4 flex items-center">
                <div>
                  <canvas id={`icon${index + 1}`} data-icon={day.icon} width="24" height="24"/>
                </div>
                <div className="ml-3">{day.summary}</div>
              </div>
              <div className="w-1/6 text-right">
                <div>{Math.round(day.temperatureHigh)}˚C</div>
                <div>{Math.round(day.temperatureLow)}˚C</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<WeatherApp/>, document.getElementById('app'));
}
