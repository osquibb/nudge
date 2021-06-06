const router = require('express').Router()
const {
    addUser,
    listUsers,
    addUserRole,
    deleteUserRole
} = require('../services/userService')

router.post('/', async (req, res) => {
  const id = await addUser(req.body)
  res.json({ id })
})

router.get('/', async (req, res) => {
  // auth
  if (!req.user) {
    res.sendStatus(401)
  }
  // operation
  const users = await listUsers()
  res.json({ users })
})

router.post('/:id/addRole', async ({ params, body }, res) => {
  //auth

  // operation
  await addUserRole(params.id, body.roleId)
  res.sendStatus(200)
})

router.delete('/:id/removeRole', async ({ params, body }, res) => {
  //auth

  // operation
  await deleteUserRole(params.id, body.roleId)
  res.sendStatus(200)
})

module.exports = router