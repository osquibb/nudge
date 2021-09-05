import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameById, nudge, updateGame } from '../game/gameSlice'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { IconButton } from '@material-ui/core'
import {
  ArrowDownward,
  ArrowUpward,
  ArrowBack,
  ArrowForward,
} from '@material-ui/icons'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

export default function GameDetails() {
  const dispatch = useDispatch()

  const { id } = useParams()
  const ws = useRef(null)
  const [timeSinceLastNudge, setTimeSinceLastNudge] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const game = useSelector(selectGameById(id))

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:5000/games/${id}`)
    ws.current.onopen = () => console.log(`ws opened for ${id}`)
    ws.current.onclose = () => console.log(`ws closed for ${id}`)

    return () => ws.current.close()
  }, [id])

  useEffect(() => {
    if (!ws.current) return

    ws.current.onmessage = async ({ data }) => {
      const { gameToUpdate, games } = await dispatch(
        updateGame(JSON.parse(data))
      )
    }
  }, [dispatch])

  useEffect(() => {
    const clockId = setInterval(() => {
      const diffMs = new Date() - new Date(game.last_nudge_at)
      setTimeSinceLastNudge({
        hours: Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => {
      clearInterval(clockId)
    }
  })

  const onNudge = (direction) => dispatch(nudge(id, direction))

  return (
    <div>
      <h2>{game ? game.title : 'No Game Found'}</h2>
      <p>Last updated: {game.updated_at}</p>
      <p>Last nudge: {game.last_nudge_at}</p>
      <p>
        Since Last Nudge:{' '}
        {`${timeSinceLastNudge.hours} hours, ${timeSinceLastNudge.minutes} minutes, ${timeSinceLastNudge.seconds} seconds`}
      </p>
      <MapContainer
        style={{ height: 400, width: 600 }}
        center={[game.latitude, game.longitude]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[game.latitude, game.longitude]}>
          <Popup>Nudge me!</Popup>
        </Marker>
      </MapContainer>
      {game.is_joined && (
        <div>
          <IconButton aria-label="up" onClick={() => onNudge('NORTH')}>
            <ArrowUpward />
          </IconButton>
          <IconButton aria-label="down" onClick={() => onNudge('SOUTH')}>
            <ArrowDownward />
          </IconButton>
          <IconButton aria-label="east" onClick={() => onNudge('EAST')}>
            <ArrowForward />
          </IconButton>
          <IconButton aria-label="west" onClick={() => onNudge('WEST')}>
            <ArrowBack />
          </IconButton>
        </div>
      )}
    </div>
  )
}
