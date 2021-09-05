import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { blue } from '@material-ui/core/colors'
import { joinGame } from '../game/gameSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    backgroundColor: blue[50],
  },
}))

export default function GameCard({ game, onClick }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const onJoin = (gameId) => dispatch(joinGame(gameId))

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          title={game.title}
          subheader={game.is_joined ? 'Already Joined' : ''}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Map here..
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add" onClick={() => onJoin(game.id)}>
          <Add />
        </IconButton>
      </CardActions>
    </Card>
  )
}
