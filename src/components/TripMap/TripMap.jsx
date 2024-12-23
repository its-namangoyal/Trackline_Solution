import React, { useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { colors } from "../../assets";
import { decodePolylineString, getPolylineCenter } from "./tripMap";
import AddressMarker from "./AddressMarker/AddressMarker";
import CoordinateMarker from "./CoordinateMarker/CoordinateMarker";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  border: `2px solid ${colors.primary}`,
};

const mapOptions = {
  disableDefaultUI: true,
};

const TripMap = ({ encodedString, startingAddress, endingAddress }) => {
  const mapRef = useRef();
  const [center, setCenter] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [decodedPath, setDecodedPath] = useState();

  // const [zoom, setZoom] = useState(14);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setZoom(15);
  //   }, 500);
  // }, []);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    setDecodedPath(decodePolylineString(encodedString));
  }, [encodedString]);

  useEffect(() => {
    if (decodedPath && !center) {
      setCenter(
        getPolylineCenter(decodedPath[0], decodedPath[decodedPath.length - 1])
      );
    }
  }, [decodedPath]);

  useEffect(() => {
    if (mapLoaded && decodedPath && mapRef.current) {
      const borderPath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: "black",
        strokeOpacity: 1.0,
        strokeWeight: 8,
      });

      const innerPath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: "black",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      borderPath.setMap(mapRef.current);
      innerPath.setMap(mapRef.current);

      // Create LatLngBounds object to fit the polyline
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((point) => {
        bounds.extend(point);
      });
      mapRef.current.fitBounds(bounds);

      return () => {
        borderPath.setMap(null);
        innerPath.setMap(null);
      };
    }
  }, [mapLoaded, decodedPath]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14} // Initial zoom value
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {decodedPath && (
        <>
          <OverlayView
            position={decodedPath[0]}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <>
              <AddressMarker
                type={"origin"}
                address={startingAddress || "Starting address"}
              />
              <CoordinateMarker type={"origin"} />
            </>
          </OverlayView>
          <OverlayView
            position={decodedPath[decodedPath.length - 1]}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <>
              <AddressMarker
                type={"end"}
                address={endingAddress || "Ending address"}
              />
              <CoordinateMarker type={"end"} />
            </>
          </OverlayView>
        </>
      )}
    </GoogleMap>
  );
};

export default React.memo(TripMap);
