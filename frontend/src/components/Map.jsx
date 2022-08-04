import React from "react";
import ReactMapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

function Map(props) {
  const [viewport, setViewport] = React.useState({
    width: "100px", //or full width then set width: "100vw",
    height: "400px", //full height then set height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/ckszotu58a7dz17qh8ysv970j"
      mapboxApiAccessToken="pk.eyJ1IjoicGV0ZXRvMTIxMyIsImEiOiJjbDZlYTM5cjAwZDcyM2pxbzdlZmc1bjBjIn0.9w786IMx9Hcan5dVv9Qsuw"
      onViewportChange={(viewport) => setViewport(viewport)}
      {...viewport}
    ></ReactMapGL>
  );
}

export default Map;