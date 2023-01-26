import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function CitiesList({ selectedCity, setSelectedCity }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [noOfPages, setNoOfPages] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(`https://settyl-server.onrender.com/weather?page=${selectedIndex}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setNoOfPages(JSON.parse(result.noOfPages));
          setWeatherData(parseData(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [selectedIndex, refetch]);

  useEffect(() => {
    const id = setInterval(() => {
      setRefetch((prev) => !prev);
    }, 5 * 60 * 5000);

    return () => clearInterval(id);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (weatherData) {
    return (
      <div style={style3}>
        <ul style={style1}>{citiesList(weatherData, setSelectedCity)}</ul>
        <div style={style2}>{pageIndexes(noOfPages, setSelectedIndex)}</div>
        <div>Selected city : {selectedCity?.name}</div>
        <div>Selected Index : {selectedIndex}</div>
      </div>
    );
  }
}

const style1 = {
  display: "flex",
  gap: "5rem",
  flexWrap: "wrap",
  cursor: "Pointer",
};

const style2 = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  listStyle: "none",
};
const style3 = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
};

const parseData = (result) => {
  return result.data.map((cityWeather) => {
    const obj = JSON.parse(cityWeather.text);
    obj.id = nanoid();
    return obj;
  });
};

const pageIndexes = (noOfPages, setSelectedIndex) => {
  let pageIndexList = [];
  for (let index = 0; index < noOfPages; index++) {
    pageIndexList.push(
      <button
        id={nanoid()}
        onClick={() => {
          setSelectedIndex(index + 1);
        }}
      >
        {index + 1}
      </button>
    );
  }
  return pageIndexList;
};

const citiesList = (weatherData, setSelectedCity) => {
  return weatherData?.map((cityWeather) => (
    <li
      id={cityWeather.id}
      onClick={() => setSelectedCity(cityWeather)}
      className="city-item"
    >
      {cityWeather.name}
    </li>
  ));
};

export default CitiesList;
