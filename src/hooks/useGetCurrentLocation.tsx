import { useState, useEffect } from "react";

interface ICurrentLocation {
  lat: number;
  lng: number;
}

/**
 * Custom React hook that retrieves the user's current geolocation coordinates.
 * Uses browser's geolocation API to fetch the coordinates with high accuracy.
 * @returns An object containing the current location coordinates and status message.
 */
const useGetCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<ICurrentLocation>();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser.');
        return;
      }
      const onSuccess = (position: { coords: { latitude: number, longitude: number} }) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setStatus('ok');
      };
      const onError = (error: any) => {
        setStatus(`Error getting geolocation: ${error.message}`);
      };
      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    };

    getLocation();
  }, []);

  return { currentLocation, status };
};

export default useGetCurrentLocation;
