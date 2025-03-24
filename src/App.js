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
