import React from "react";
import "./CoordinateMarker.css";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import StopCircleTwoToneIcon from "@mui/icons-material/StopCircleTwoTone";
import TripOriginTwoToneIcon from "@mui/icons-material/TripOriginTwoTone";
import { assets } from "../../../assets";

function CoordinateMarker({ type }) {
  return (
    <div className="coordinateMarkerContainer">
      <div className="markerBg"></div>
      {type === "origin" ? (
        <TripOriginIcon className="coordinateMarkerIcon" />
      ) : (
        <StopCircleIcon className="coordinateMarkerIcon" />
      )}
    </div>
  );
}

export default CoordinateMarker;
