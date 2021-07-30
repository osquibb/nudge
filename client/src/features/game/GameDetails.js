import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectGameById } from '../game/gameSlice'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function GameDetails() {

  const { id } = useParams()
  const game = useSelector(selectGameById(id))

  return (
    <div>
      <h2>{game ? game.title : 'No Game Found'}</h2>
      <MapContainer style={{ height: 400, width: 600 }} center={[game.latitude, game.longitude]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[game.latitude, game.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
