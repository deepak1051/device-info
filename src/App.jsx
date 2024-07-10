import { useState } from 'react';
import styled from 'styled-components';
import {
  isMobile,
  isTablet,
  isBrowser,
  deviceType,
  browserName,
  browserVersion,
  osName,
  osVersion,
  engineName,
  engineVersion,
  userAgent,
} from 'react-device-detect';

const AppContainer = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  padding: 20px;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Button = styled.button`
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #21a1f1;
  }
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  max-width: 800px;
  margin: 20px 0;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f8f9fa;
  font-weight: bold;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

function App() {
  const [deviceInfo, setDeviceInfo] = useState(null);

  const getDeviceInfo = () => {
    const info = {
      'Is Mobile': isMobile,
      'Is Tablet': isTablet,
      'Is Browser': isBrowser,
      'Device Type': deviceType,
      'Browser Name': browserName,
      'Browser Version': browserVersion,
      'OS Name': osName,
      'OS Version': osVersion,
      'Engine Name': engineName,
      'Engine Version': engineVersion,
      'Full User Agent': userAgent,
    };
    setDeviceInfo(info);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Device Information</Title>
        <Button onClick={getDeviceInfo}>Get Device Info</Button>
      </Header>
      {deviceInfo && (
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Property</TableHeader>
                <TableHeader>Value</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {Object.entries(deviceInfo).map(([key, value]) => (
                <TableRow key={key}>
                  <TableData>{key}</TableData>
                  <TableData>
                    {value !== undefined ? value.toString() : 'N/A'}
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </AppContainer>
  );
}

export default App;
