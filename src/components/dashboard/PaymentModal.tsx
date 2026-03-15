import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Coins, Zap, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Payment Modal Component
 * Refined for higher tiers and USD conversion.
 * Uses a Portal for perfect viewport centering.
 */
export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [mounted, setMounted] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>("");
  const presets = [10, 20, 50, 100, 250];

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTotal = (amount: number) => {
    let bonus = 0;
    if (amount >= 20) {
      bonus = Math.floor(amount * 0.05);
    }
    return { amount, bonus, total: amount + bonus };
  };

  const handleAmountSelect = (val: number) => {
    setCustomAmount(val.toString());
  };

  const currentAmount = Math.floor(parseInt(customAmount) || 0);
  const { bonus, total } = calculateTotal(currentAmount);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="payment-modal centralized"
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="flex flex-row items-center gap-2 flex-nowrap">
                <Coins className="text-yellow-500 shrink-0" size={18} />
                <span className="text-sm font-black m-0 leading-none whitespace-nowrap">Purchase NG</span>
              </div>
              <button className="modal-close" onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="preset-grid">
                {presets.map((amt) => {
                  const info = calculateTotal(amt);
                  return (
                    <button 
                      key={amt} 
                      className={`preset-card ${currentAmount === amt ? 'active' : ''}`}
                      onClick={() => handleAmountSelect(amt)}
                    >
                      <span className="preset-value">{amt} NG</span>
                      <span className="preset-bonus">+{info.bonus} Bonus</span>
                    </button>
                  );
                })}
              </div>

              <div className="manual-input-wrap">
                <label className="input-label">Custom Amount</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter amount..."
                    className="manual-input"
                  />
                  <div className="input-currency">NG</div>
                </div>
              </div>

              {currentAmount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="summary-box"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="summary-row !mb-0">
                      <span className="opacity-70">Price:</span>
                      <span className="font-bold ml-1">${currentAmount.toFixed(2)} USD</span>
                    </div>
                    <div className="summary-row !mb-0">
                      <span className="opacity-70">Bonus:</span>
                      <span className="text-green-500 font-bold ml-1">+{bonus} NG</span>
                    </div>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-row total !mb-0">
                    <span className="text-sm font-bold">Total:</span>
                    <span className="text-accent-primary text-xl font-black">{total} NG</span>
                  </div>
                </motion.div>
              )}

              <div className="payment-divider">
                <span>Payment Gateways</span>
              </div>

              <div className="method-list">
                <div className="method-item active">
                  <Coins size={16} className="text-accent-primary" />
                  <div className="method-info">
                    <strong>PayPal / Stripe</strong>
                    <span className="text-[10px]">Instant USD Gateway</span>
                  </div>
                  <Zap size={12} className="text-yellow-500 ml-auto" />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary ghost text-xs !py-2" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary glow text-xs !py-2" disabled={currentAmount <= 0}>
                Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
