import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

interface TripMapProps {
  locations: Array<{ lat: number; lng: number }>;
}

const TripMap: React.FC<TripMapProps> = ({ locations }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
    >
      {locations.map((location, index) => (
        <Marker 
          key={index} 
          position={location} 
        />
      ))}
    </GoogleMap>
  );
};

export default TripMap;