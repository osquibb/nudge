import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame, setGameById } from '../game/gameSlice'

export default function GameDetails() {

  const dispatch = useDispatch();
  const { id } = useParams()
  const game = useSelector(selectGame)

  useEffect(() => dispatch(setGameById(id)), [id, dispatch])

  return (
    <div>
      <h2>{game ? game.title : 'No Game Found'}</h2>
    </div>
  )
}
