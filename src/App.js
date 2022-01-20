import {useState} from "react"
import ReactMapGL,{Marker} from 'react-map-gl'
import {Rooms} from ''
function App() {
  const [viewport, setViewport] =useState({
    width:"100vw",
    height:"100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  return (
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoia2Vsdmlua2FuIiwiYSI6ImNreW5hMmtkYTNvZnUyd3A4ZXQzdnA3YWkifQ.vO-0lRxsKwSrZJy8Tin_LQ"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Marker
      latitude= {37.7577}
      longitude= {-122.4376}
      offsetLeft={-20}
      offsetTop={-10}
      >
        <h1>here</h1>
      </Marker>
    </ReactMapGL>
    </div>
  );
}

export default App;
