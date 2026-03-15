import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserCircle2, PlusCircle } from "lucide-react";
import { CharacterCard } from "@/components/dashboard/CharacterCard";

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
    <div className="dashboard-premium-container">
      <header className="dashboard-welcome">
        <h1 className="welcome-title">My Characters</h1>
        <p className="welcome-subtitle">
          Manage your linked game characters on the Rosevain server.
        </p>
      </header>

      {characters.length === 0 ? (
        <div className="empty-state-card">
          <UserCircle2 size={64} className="empty-icon" />
          <h3 className="empty-title">No characters found</h3>
          <p className="empty-desc">
            Your journey hasn't started yet. Create a character in-game to see them here.
          </p>
          <button className="btn btn-secondary mt-4">
            <PlusCircle size={18} /> How to connect
          </button>
        </div>
      ) : (
        <div className="char-grid-premium">
          {characters.map((char: any) => (
            <CharacterCard key={char.charId} char={char} />
          ))}
        </div>
      )}
    </div>
  );
}
