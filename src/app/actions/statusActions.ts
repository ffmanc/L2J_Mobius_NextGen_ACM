"use server";

import { db } from "@/lib/db";
import { checkPort } from "@/lib/serverUtils";

export type ServerStatusData = {
  loginStatus: boolean;
  gameStatus: boolean;
  onlinePlayers: number;
  onlineGMs: number;
};

/**
 * Server Action to fetch the current status of the server.
 * This includes port checks for Login/Game servers and online counts from the DB.
 */
export async function getServerStatus(): Promise<ServerStatusData> {
  const loginHost = process.env.LOGIN_HOST || "127.0.0.1";
  const loginPort = Number(process.env.LOGIN_PORT) || 2106;
  const gameHost = process.env.GAME_HOST || "127.0.0.1";
  const gamePort = Number(process.env.GAME_PORT) || 7777;

  try {
    // 1. Check port connectivity
    const [loginStatus, gameStatus] = await Promise.all([
      checkPort(loginHost, loginPort),
      checkPort(gameHost, gamePort),
    ]);

    // 2. Fetch online players and GMs from DB
    // Assuming 'online' is 1 for online players and accesslevel > 0 for GMs
    const [onlinePlayers, onlineGMs] = await Promise.all([
      db.character.count({ where: { online: 1 } }),
      db.character.count({ where: { online: 1, accesslevel: { gt: 0 } } }),
    ]);

    return {
      loginStatus,
      gameStatus,
      onlinePlayers,
      onlineGMs,
    };
  } catch (error) {
    console.error("Failed to fetch server status:", error);
    return {
      loginStatus: false,
      gameStatus: false,
      onlinePlayers: 0,
      onlineGMs: 0,
    };
  }
}
