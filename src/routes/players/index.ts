import express from 'express'
import { getPlayersController, votePlayerController } from '../../controllers/players'

const router = express.Router()

router.get("/players", getPlayersController)

router.post("/players/votes", votePlayerController)

export default router