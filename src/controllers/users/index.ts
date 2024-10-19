import { Request, Response } from "express"
import { getUsers } from "../../services/users"

export async function getUsersController(req: Request, res: Response) {
    try {
        const users = await getUsers()
        return res.json(users)
    } catch (error: any) {
        return res.status(500).send(error?.message)
    }
}