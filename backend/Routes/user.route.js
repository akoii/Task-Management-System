import express from 'express'

import {
    signup,
    login,

} from '../Controller/user.controller.js'

const router = express.Router(); // Use Router() to create a router instance

router.post('/signup', signup)
router.post('/login', login)

export default router