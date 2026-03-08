import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/NavigationMap.css";

function NavigationMap({ userLocation, shop }) {

 if (!shop) return null;

 return (

<div className="navigation-map">

<MapContainer
 center={[shop.latitude, shop.longitude]}
 zoom={15}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<Marker position={userLocation} />
<Marker position={[shop.latitude, shop.longitude]} />

</MapContainer>

</div>

 );

}

export default NavigationMap;