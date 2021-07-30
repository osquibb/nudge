import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectGameById } from '../game/gameSlice'

export default function GameDetails() {

  const { id } = useParams()
  const game = useSelector(selectGameById(id))

  return (
    <div>
      <h2>{game ? game.title : 'No Game Found'}</h2>
    </div>
  )
}
