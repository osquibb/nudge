import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, logout } from '../user/userSlice'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Modal,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import LoginForm from '../../features/user/LoginForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  list: {
    width: 250,
  },
}))

const getSignInModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

export default function NavBar(props) {
  const dispatch = useDispatch()
  let history = useHistory()

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const authenticatedUser = useSelector(selectUser)
  const classes = useStyles()

  const [signInModalStyle] = useState(getSignInModalStyle)

  const drawerItems = [
    { text: 'Home', route: '/' },
    { text: 'Games', route: '/games' },
  ]

  const signOut = async () => {
    await dispatch(logout())
    history.push('/')
  }

  const signIn = () => setIsSignInModalOpen(true)

  const closeSignInModal = () => setIsSignInModalOpen(false)

  const toggleDrawer = (isOpen) => setIsDrawerOpen(isOpen)

  const goTo = (route) => {
    history.push(route)
    toggleDrawer(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => toggleDrawer(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nudge
          </Typography>
          <Button onClick={() => (authenticatedUser.id ? signOut() : signIn())}>
            {authenticatedUser.id ? 'Sign Out' : 'Sign In'}
          </Button>
          {authenticatedUser.id && <AccountCircle />}
        </Toolbar>
      </AppBar>
      <Modal open={isSignInModalOpen} onClose={closeSignInModal}>
        <div style={signInModalStyle} className={classes.paper}>
          <LoginForm onSignIn={closeSignInModal} />
        </div>
      </Modal>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <List className={classes.list}>
          {drawerItems.map((item, idx) => (
            <ListItem button key={idx} onClick={() => goTo(item.route)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}
