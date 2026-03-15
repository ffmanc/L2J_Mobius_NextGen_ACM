"use client";

import { Coins, Plus } from "lucide-react";
import { useState } from "react";
import { PaymentModal } from "@/components/dashboard/PaymentModal";

/**
 * Balance Badge Component
 * Displays user balance and a "+" button to top-up.
 */
export function BalanceBadge() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const balance = 0; // In a real app, this would come from a context or server-side fetch

  return (
    <>
      <div className="balance-badge-compact">
        <div className="flex items-center gap-2 pl-2">
          <Coins size={14} className="text-yellow-500" />
          <span className="balance-text flex items-center gap-1">
            {Math.floor(balance)} <span className="currency-label">NG</span>
          </span>
        </div>
        <button 
          className="balance-add-btn"
          onClick={() => setIsModalOpen(true)}
          title="Add Credits"
        >
          <Plus size={14} />
        </button>
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
