import { Request, Response } from "express"
import { getPlayers, votePlayer } from "../../services/players"

export async function getPlayersController(req: Request, res: Response) {
    try {
        const players = await getPlayers()
        return res.json(players)
    } catch (error: any) {
        return res.status(500).send(error?.message)
    }
}

export async function votePlayerController(req: Request, res: Response){
    try {
        const body = req.body
        if(!body || !body.playerId) {
            return res.status(400).json("Invalid request payload")
        }
        const result = await votePlayer(body.playerId)
        return res.json(result)
    } catch (error: any) {
        return res.status(500).send(error?.message)
    }
}