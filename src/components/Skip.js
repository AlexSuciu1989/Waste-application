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
