# Waste-application
Created with CodeSandbox

## Overview
This project was built with React and Bootstrap. It allows users to search for skip hire options based on their location (currently hardcoded) and select the desired skip. The application fetches data from an API and displays it in a user-friendly interface.

## Features
- **Location-Based Search**: Users can search for skip hire options based on postcode and area (feature hardcoded).
- **Dynamic Data Fetching**: Fetches skip data from an API and displays it.
- **Interactive UI**: Users can select a skip, and the selection is visually highlighted.
- **Responsive Design**: Utilizes Bootstrap for responsive and modern design.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Bootstrap**: CSS framework for responsive design.
- **Axios**: Promise-based HTTP client for making API requests.

## Components
**GetLocation**:
The component that fetches data using axios.

**App**:
The main component that triggers getLocation and renders Skip components based on data.

**Skip**:
A component that displays individual skip details and handles selection.

## Workspace Tree

```plaintext
src/
├── components/
│   ├── Skip.js
│   ├── Skip.css
├── services/
│   └── api.js
├── resources/
│   └── skip_cover.jpg
├── App.js
└── styles.css

```
## App.js
``` javascript
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Skip from "./components/Skip";
import { getLocation } from "./services/api";

export default function App() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkip, setSelectedSkip] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const data = await getLocation("NR32", "Lowestoft");
        setSkips(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const handleClick = (skipId) => {
    setSelectedSkip(skipId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const selectedSkipData = skips.find((skip) => skip.id === selectedSkip);

  return (
    <div className="App container-flex d-flex flex-column justify-content-center">
      <div className="text-center my-4">
        <h1 className="text-secondary">Choose Your Skip Size</h1>
        <h4>Select the skip size that best suits your needs</h4>
      </div>
      <div className="skipsContainer container d-flex flex-wrap justify-content-center">
        {skips.map((skip) => (
          <Skip
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip === skip.id}
            onClick={() => handleClick(skip.id)}
          />
        ))}
      </div>
      <div className="footerBar d-flex justify-content-between p-2 border-top border-dark border-2">
        <div className="text-white">
          {selectedSkipData ? (
            <div>
              <span className="text-secondary">
                {selectedSkipData.size} yards,{" "}
                {selectedSkipData.hire_period_days} day hire period{" "}
              </span>
              <span className="text-primary fs-5 fw-bold">
                {" "}
                £{selectedSkipData.price_before_vat}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <button className="btn btn-primary"> Continue</button>
      </div>
    </div>
  );
}
```
## Skip.js
```javascript
import React from "react";
import "./Skip.css";
import cover from "../resources/skip_cover.jpg";

const Skip = ({ skip, isSelected, onClick }) => {
  return (
    <div
      className={`Skip card border-${
        isSelected ? "primary" : "dark"
      } rounded border-2 p-2 m-2`}
      onClick={onClick}
    >
      <div>
        <div className="imgContainer rounded">
          <img src={cover} alt="Skip cover img"></img>
          <h1 className="text-white bg-secondary bg-opacity-50">
            <span>{skip.size}</span> yards
          </h1>
          {skip.allowed_on_road && (
            <p className="warning text-warning bg-black rounded px-2 py-1 m-1">
              ⚠ Private property only
            </p>
          )}
        </div>
      </div>
      <p className="text-secondary">{skip.hire_period_days} day hire period</p>
      <p className="align-self-start text-secondary">
        <span className="text-primary fs-2 me-1">£{skip.price_before_vat}</span>{" "}
        per week
      </p>
      <button className={`btn btn-${isSelected ? "primary" : "dark"}`}>
        {isSelected ? "Selected" : "Select this skip"}
      </button>
    </div>
  );
};

export default Skip;
```
## api.js
```javascript
import axios from "axios";

const URL = "https://app.wewantwaste.co.uk/api/";

export const getLocation = async (postcode, area) => {
  try {
    const response = await axios.get(`${URL}skips/by-location`, {
      params: { postcode, area },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data by location:", error);
    throw error;
  }
};

```

