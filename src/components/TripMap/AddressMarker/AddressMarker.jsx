import React from "react";
import "./AddressMarker.css";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import StopCircleIcon from "@mui/icons-material/StopCircle";

function AddressMarker({ address, type }) {
  return (
    <div className="mapAddressMarker">
      <div className="markerContent">
        <div className="iconWrap">
          {type === "origin" ? (
            <TripOriginIcon className="markerIcon" />
          ) : (
            <StopCircleIcon className="markerIcon" />
          )}
        </div>

        <div className="address">{address}</div>
      </div>
    </div>
  );
}

export default AddressMarker;
