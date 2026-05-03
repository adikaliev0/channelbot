import { motion } from "motion/react";
import { ShieldBan, AlertTriangle, Fingerprint } from "lucide-react";
import { cn } from "../../lib/utils";

interface BlockedScreenProps {
  reason: string;
  code: string;
}

export function BlockedScreen({ reason, code }: BlockedScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 px-6 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative">
           <ShieldBan size={40} className="text-rose-500 relative z-10" />
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute inset-0 rounded-[2rem] bg-rose-500/20 blur-xl"
           />
        </div>
        
        <h1 className="text-2xl font-bold text-white tracking-tight mb-3">Доступ ограничен</h1>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-8">
           <div className="flex items-start gap-3 text-left">
             <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
             <div>
                <div className="text-sm font-semibold text-white mb-1">Причина блокировки</div>
                <div className="text-sm text-zinc-400">{reason}</div>
             </div>
           </div>
           
           <div className="w-full h-px bg-zinc-800/50 my-4" />
           
           <div className="flex items-center gap-3 text-left">
             <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Fingerprint size={16} className="text-zinc-600" />
             </div>
             <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-0.5">Код ошибки</div>
                <div className="text-xs font-mono text-zinc-300 bg-black/40 px-2 py-0.5 rounded border border-zinc-800 inline-block">{code}</div>
             </div>
           </div>
        </div>

        <p className="text-xs text-zinc-500">
          Защита обеспечена системой VaultDrop Anti-Twin Engine. Если Вы считаете это ошибкой, обратитесь в поддержку.
        </p>
      </motion.div>
    </div>
  )
}
