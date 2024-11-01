import { useState, useEffect } from "react";
import { ICurrentLocation } from "./useGetCurrentLocation.interface";



/**
 * Custom hook to retrieve the current geographical location of the user.
 * Utilizes the browser's Geolocation API to fetch the latitude and longitude.
 * 
 * @returns An object containing:
 *   - `currentLocation`: An object with `lat` and `lng` properties indicating the user's current location.
 *   - `status`: A status string indicating the success or failure of the location request.
 * 
 * ### Usage:
 * Use `useGetCurrentLocation` to retrieve the user's geographical coordinates.
 * 
 * - Automatically requests location upon mount.
 * - Provides feedback on status (e.g., success, error, unsupported).
 * 
 * ### Example:
 * ```typescript
 * import useGetCurrentLocation from './hooks/useGetCurrentLocation';
 * 
 * const MyComponent = () => {
 *   const { currentLocation, status } = useGetCurrentLocation();
 *   
 *   return (
 *     <div>
 *       <p>Status: {status}</p>
 *       {currentLocation ? (
 *         <p>Location: {currentLocation.lat}, {currentLocation.lng}</p>
 *       ) : (
 *         <p>Location not available</p>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 * 
 * @returns An object containing:
 *   - `currentLocation`: An object of type `ICurrentLocation` with `lat` and `lng` properties representing latitude and longitude.
 *   - `status`: A string describing the status of the geolocation request.
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
