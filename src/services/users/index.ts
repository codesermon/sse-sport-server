import prisma from "../../db"

export const getUsers = async() => {
    try {
        const users = await prisma.user.findMany({include: { quiz: true}})
        return users
    } catch (error) {
        throw error
    }
}