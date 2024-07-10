// src/Location.js
import React, { useState, useEffect } from 'react';
import UAParser from 'ua-parser-js';
// import './Location.css';

const Location = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [deviceModel, setDeviceModel] = useState(null);

  useEffect(() => {
    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }

    // Get device details
    const parser = new UAParser();
    const result = parser.getResult();
    setDeviceDetails(result);

    // Determine the device model (if available)
    const deviceModel = `${result.device.vendor || ''} ${
      result.device.model || ''
    }`.trim();
    setDeviceModel(deviceModel || 'Unknown Device Model');
  }, []);

  return (
    <div className="container">
      <h2 className="title">Device Location and Details</h2>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <div className="section">
          <h3 className="section-title">Location</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <th>Latitude</th>
                <td>{location.lat}</td>
              </tr>
              <tr>
                <th>Longitude</th>
                <td>{location.lon}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="section">
        <h3 className="section-title">Device Details</h3>
        <table className="data-table">
          <tbody>
            <tr>
              <th>Device Model</th>
              <td>{deviceModel}</td>
            </tr>
            {deviceDetails &&
              Object.entries(deviceDetails).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>
                    {typeof value === 'object'
                      ? JSON.stringify(value, null, 2)
                      : value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Location;
