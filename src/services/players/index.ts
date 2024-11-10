import prisma from "../../db";
import sseEmitter from "../../sseEmitter";


export const getPlayers = async () => {
    try {
      const result = await prisma.player.findMany({});
      return result
    } catch (error: any) {
      throw error;
    }
  };

  export const votePlayer = async (playerId: string) => {
    try {
      const result = await prisma.player.update({data: { points: { increment: 1 }}, where: { id: playerId} });
      //   emit sse event
      sseEmitter.send(result, "player_voted")
      return result
    } catch (error: any) {
      throw error;
    }
  };

const playerService = { getPlayers, votePlayer }

export default playerService