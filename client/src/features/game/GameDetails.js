import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useInterval from '../../hooks/useInterval.js'
import { selectGameById, getGameById, nudge } from '../game/gameSlice'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { IconButton } from '@material-ui/core'
import { ArrowDownward, ArrowUpward, ArrowBack, ArrowForward } from '@material-ui/icons'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function GameDetails() {

  const dispatch = useDispatch()

  const { id } = useParams()
  const game = useSelector(selectGameById(id))

  useInterval(() => dispatch(getGameById(id)), 3000)

  const onNudge = direction => dispatch(nudge(id, direction))

  return (
    <div>
      <h2>{game ? game.title : 'No Game Found'}</h2>
      <i>Last updated: {game.updated_at}</i>
      <MapContainer style={{ height: 400, width: 600 }} center={[game.latitude, game.longitude]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[game.latitude, game.longitude]}>
          <Popup>
            Nudge me!
          </Popup>
        </Marker>
      </MapContainer>
      { game.is_joined &&
      <div>
        <IconButton aria-label="up" onClick={() => onNudge('NORTH')}>
          <ArrowUpward/>
        </IconButton>
        <IconButton aria-label="down" onClick={() => onNudge('SOUTH')}>
          <ArrowDownward/>
        </IconButton>
        <IconButton aria-label="east" onClick={() => onNudge('EAST')}>
          <ArrowForward/>
        </IconButton>
        <IconButton aria-label="west" onClick={() => onNudge('WEST')}>
          <ArrowBack/>
        </IconButton>
      </div>}
    </div>
  )
}
