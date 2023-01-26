import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import CitiesList from "./CitiesList";
import "./App.css";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    map?.flyTo(
      selectedCity
        ? [selectedCity?.coord.lat, selectedCity?.coord.lon]
        : [51.505, -0.09],
      14,
      {
        duration: 3,
      }
    );
  }, [selectedCity, map]);

  return (
    <div>
      <MapContainer
        center={
          selectedCity
            ? [selectedCity?.coord?.lat, selectedCity?.coord?.lon]
            : [51.505, -0.09]
        }
        zoom={13}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={
            selectedCity
              ? [selectedCity?.coord?.lat, selectedCity?.coord?.lon]
              : [51.505, -0.09]
          }
        >
          <Popup>
            {selectedCity?.name} <br /> {selectedCity?.main.temp} <br />{" "}
            {selectedCity?.weather[0].description}
          </Popup>
        </Marker>
      </MapContainer>
      <CitiesList
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  );
}

export default App;
