import {useState,useEffect} from "react"
import ReactMapGL,{Marker,Popup} from 'react-map-gl'
import {Room,Star} from '@material-ui/icons'
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'
import axios from 'axios'
import {format} from 'timeago.js'


function App() {
  const currentuser="kanobric"
  const[pins,setpins]=useState([])
  const [placeId,setPlaceId]=useState(null)
  const [place,setNewPlace]=useState(null)
  //inputs
  const [title,setTitle]=useState(null)
  const [desc,setDesc]=useState(null)
  const [rating,setRating]=useState(0)

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

  const handle=(id,lat,long)=>{
   setPlaceId(id)
   setViewport({...viewport,longitude:long,latitude:lat})
  }
  
  const handleAddClick=(e)=>{
    const[long,lat]=(e.lngLat)
    setNewPlace({
       long,
       lat
    })
  }
    
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const newpin={
      username:currentuser,
      title,
      desc,
      rating,
      lat:place.lat,
      long:place.long
    }
    try{
     const res=await axios.post('http://localhost:5000/api/pins',newpin)
     setpins([...pins,res.data])
     setNewPlace(null)
    }catch(err){
       alert(err)
    }
  }
  return (
    <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoia2Vsdmlua2FuIiwiYSI6ImNreW5hMmtkYTNvZnUyd3A4ZXQzdnA3YWkifQ.vO-0lRxsKwSrZJy8Tin_LQ"
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={handleAddClick}
      transitionDuration="1000"
    > {pins.map((p)=>(
      <>
           <Marker
      latitude= {p.lat}
      longitude= {p.long}
      offsetLeft={-viewport.zoom *3.5}
      offsetTop={-viewport.zoom *7}
      >
       <Room 
       style={{fontSize:viewport.zoom *5,color:p.username===currentuser ? "tomato":"slateblue"}}
       onClick={()=>handle(p._id,p.lat,p.long)}
       />
    
      </Marker>
      {p._id===placeId && (
       <Popup
       latitude= {p.lat}
       longitude= {p.long}
       closeButton={true}
       closeOnClick={false}
       anchor="left"
       onClose={()=>{setPlaceId(null)}}
      >
      <div className='card'>
        <label>place</label>
        <h4 className="place">{p.title}</h4>
        <label>review</label>
        <p className="desc">{p.desc}</p>
        <label>rating</label>
        <div className="stars">
         {Array(p.rating).fill(<Star className="star"/>)}
        </div>
        <label>information</label>
        <span className="username">created by :<b>{p.username}</b></span>
        <span className="date">{format(p.createdAt)}</span>
 
      </div>
      </Popup>
      )}
      </>
    ))}
      {place && (
        <Popup
        latitude= {place.lat}
        longitude= {place.long}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={()=>{setNewPlace(null)}}
       >
       <div>
          <form onSubmit={handleSubmit}>
             <label>place</label>
             <input type="text" placeholder="title" onChange={(e)=>{setTitle(e.target.value)}}/>
             <label>review</label>
             <textarea placeholder="say something about us" onChange={(e)=>{setDesc(e.target.value)}}/>
             <label>rating</label>
             <select onChange={(e)=>{setRating(e.target.value)}}>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
             </select>
             <br />
             <button className="btn" type="submit">add pin</button>
          </form>
       </div>
       </Popup>
      )}
      <button classname="button logout">logout</button>
      <button classname="button login">login</button>
      <button classname="button register">register</button>
    </ReactMapGL>
    </div>
  );
}

export default App;
