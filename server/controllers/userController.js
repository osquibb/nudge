const router = require('express').Router()
const {
    addUser,
    listUsers,
    addUserRole,
    deleteUserRole
} = require('../services/userService')
const { isAdmin } = require('../utils/authUtils')

router.post('/', async ({ body }, res) => {
  // auth

  // operation
  const id = await addUser(body)
  res.json({ id })
})

router.get('/', async ({ user }, res) => {
  // auth
  if (!isAdmin(user)) {
    res.sendStatus(401)
  }
  // operation
  const users = await listUsers()
  res.json({ users })
})

router.post('/:userId/addRole', async ({ user, params, body }, res) => {
  //auth
  if (!isAdmin(user)) {
    res.sendStatus(401)
  }
  // operation
  await addUserRole(params.userId, body.roleId)
  res.sendStatus(200)
})

router.delete('/:userId/removeRole', async ({ user, params, body }, res) => {
  //auth
  if (!isAdmin(user)) {
    res.sendStatus(401)
  }
  // operation
  await deleteUserRole(params.userId, body.roleId)
  res.sendStatus(200)
})

module.exports = router