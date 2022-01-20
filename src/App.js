import {useState,useEffect} from "react"
import ReactMapGL,{Marker,Popup} from 'react-map-gl'
import {Room,Star} from '@material-ui/icons'
import './App.css'
import axios from 'axios'


function App() {
  const[pins,setpins]=useState([])
  const [viewport, setViewport] =useState({
    width:"100vw",
    height:"100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 15
  });

  useEffect(()=>{
    const getpins= async ()=>{
      try{
           const res=await axios.get('http://localhost:5000/api/pins')
           setpins(res.data)
      }catch(err){
       console.log(err)
      }
    }
    getpins()
  },[])

  return (
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoia2Vsdmlua2FuIiwiYSI6ImNreW5hMmtkYTNvZnUyd3A4ZXQzdnA3YWkifQ.vO-0lRxsKwSrZJy8Tin_LQ"
      onViewportChange={(viewport) => setViewport(viewport)}
    > {pins.map((p)=>(
      <>
           <Marker
      latitude= {p.lat}
      longitude= {p.long}
      offsetLeft={-20}
      offsetTop={-10}
      >
       <Room style={{fontSize:viewport.zoom *5, color:"slateblue"}}/>
    
      </Marker>
      {/* <Popup
       latitude= {37.7577}
       longitude= {-122.4376}
       closeButton={true}
       closeOnClick={false}
       anchor="left"
      >
      <div className='card'>
        <label>place</label>
        <h4 className="place">Gbawe</h4>
        <label>review</label>
        <p className="desc">beautiful palace</p>
        <label>rating</label>
        <div className="stars">
         <Star className="star"/>
         <Star className="star"/>
         <Star className="star"/>
         <Star className="star"/>
         <Star className="star"/>
        </div>
        <label>information</label>
        <span className="username">created by :<b>obirkan</b></span>
        <span className="date">1 hour ago</span>
 
      </div>
      </Popup> */}
      </>
    ))}
    </ReactMapGL>
    </div>
  );
}

export default App;
