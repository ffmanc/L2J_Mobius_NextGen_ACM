import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserCircle2 } from "lucide-react";
import { ServerStatus } from "@/components/dashboard/ServerStatus";

/**
 * Modern Character Dashboard
 * Queries the `characters` table directly linked to the L2J Game Server
 * and displays them in a responsive CSS grid.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("l2j_session");

  if (!session?.value) {
    redirect("/login");
  }

  // Fetch all characters linked to this account from the legacy database
  const characters = await db.character.findMany({
    where: { account_name: session.value },
    orderBy: { exp: "desc" },
  });

  return (
    <div>
      <ServerStatus />
      
      <h1 style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}>My Characters</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Manage your linked game characters on the Rosevain server.
      </p>

      {characters.length === 0 ? (
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "12px",
            border: "1px dashed var(--border-light)",
          }}
        >
          <UserCircle2 size={48} style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }} />
          <h3 style={{ color: "var(--text-secondary)", margin: 0 }}>No characters found</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Create a character in-game to see them here.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {characters.map((char: any) => (
            <div
              key={char.charId}
              className="character-card"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-light)",
                borderRadius: "12px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "transform var(--transition-normal)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>{char.char_name}</strong>
                <span
                  style={{
                    backgroundColor: char.online ? "var(--success)" : "var(--bg-tertiary)",
                    color: char.online ? "#fff" : "var(--text-muted)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {char.online ? "ONLINE" : "OFFLINE"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <div><strong>Level:</strong> {char.level || 0}</div>
                <div><strong>Class ID:</strong> {char.classid ?? "Unknown"}</div>
                <div><strong>PvP / PK:</strong> {char.pvpkills || 0} / {char.pkkills || 0}</div>
                <div><strong>Play Time:</strong> {char.onlinetime ? Math.floor(char.onlinetime / 60) : 0} hours</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
