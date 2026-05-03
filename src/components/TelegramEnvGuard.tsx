import { useState } from "react";
import { motion } from "motion/react";
import { AlertTriangle, Smartphone } from "lucide-react";

export function TelegramEnvGuard({ children }: { children: React.ReactNode }) {
  // In a real app we'd check window.Telegram?.WebApp.
  // For demo/development purposes, we add a bypass button.
  // We can default this to true in dev, but let's show it to simulate the requirement.
  
  const isRunningInTelegram = !!(window as any).Telegram?.WebApp;
  const [bypassed, setBypassed] = useState(isRunningInTelegram);

  // If we are in dev/preview, we might want to bypass it automatically, 
  // but to show the UX required, we will render it if bypassed is false.
  
  // To avoid blocking the preview completely, we will allow bypass
  
  if (bypassed) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-zinc-950 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-md"></div>
          <Smartphone size={32} className="text-zinc-300 relative z-10" />
          <AlertTriangle size={16} className="text-amber-500 absolute bottom-3 right-3 z-10" />
        </div>
        
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Откройте через Telegram</h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8">
          VaultDrop работает исключительно внутри мессенджера Telegram. Это необходимо для обеспечения безопасности и защиты от мультиаккаунтов.
        </p>

        <a 
          href="https://t.me/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-900/40 border border-blue-500 flex justify-center items-center mb-4"
        >
          Перейти в Telegram
        </a>
        
        <div className="pt-6 border-t border-zinc-800/50 w-full mt-4">
           {/* Bypass for development */}
           <button 
             onClick={() => setBypassed(true)}
             className="text-xs text-zinc-600 hover:text-zinc-400 uppercase tracking-widest font-semibold transition-colors"
           >
             Продолжить в браузере (Dev)
           </button>
        </div>
      </motion.div>
    </div>
  );
}
