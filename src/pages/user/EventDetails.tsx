import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Gift, Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { PreCheck } from "../../components/ui/PreCheck";
import { Skeleton } from "../../components/ui/Skeleton";
import { BlockedScreen } from "../../components/ui/BlockedScreen";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const isGiveaway = id?.startsWith('ga');

  const [premiumDone, setPremiumDone] = useState(false);
  const [participatingState, setParticipatingState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [preCheckDone, setPreCheckDone] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const canParticipate = premiumDone; // sub is true by default, so just need premium

  const handleParticipate = () => {
    if (!canParticipate) return;
    setParticipatingState('loading');
    setTimeout(() => {
      setParticipatingState('success');
    }, 1500);
  };

  // For Demo: Randomly show blocked sometimes or allow toggle
  // In a real app we would get status from pre-check
  if (!preCheckDone) {
    return <PreCheck onComplete={() => setPreCheckDone(true)} onFail={(r) => console.log(r)} />
  }

  if (isBlocked) {
    return <BlockedScreen reason="Обнаружено подозрительное совпадение отпечатков устройства с другим аккаунтом." code="ERR_TWIN_04" />
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Immersive Header */}
      <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 opacity-50 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10"></div>
        
        {/* Nav */}
        <div className="absolute top-0 inset-x-0 z-20 pt-safe px-4 pb-2 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
           <div>
             <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]">Активен</span>
                <span className="text-xs font-mono text-zinc-300/80 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/5 uppercase">{id}</span>
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
               {isGiveaway ? 'Раздача Premium аккаунтов' : 'Еженедельный VIP Pass'}
             </h1>
           </div>
           <div className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center shrink-0">
              {isGiveaway ? <Gift size={28} className="text-purple-400" /> : <Ticket size={28} className="text-blue-400" />}
           </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col pt-0">
        
        {/* Conditions Block */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
            Условия участия
          </h2>
          
          <div className="space-y-4 relative z-10">
            <ConditionRow 
              label="Подписка на канал" 
              desc="@adixxlee_random" 
              isDone={true} 
            />
            <div className="h-px w-full bg-zinc-800/50"></div>
            <ConditionRow 
              label="Привязка Telegram Premium" 
              desc="Для защиты от ботов" 
              isDone={premiumDone} 
              onComplete={() => setPremiumDone(true)}
            />
          </div>
        </div>

        {/* Action State */}
        <div className="mt-auto">
           {isGiveaway ? (
              <div className="text-center mb-6">
                 <div className="inline-flex items-center justify-center gap-2 text-zinc-400 text-sm font-medium mb-4 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 relative transition">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   Волна 2 активна
                 </div>
                 <h3 className="text-xl font-semibold mb-1 mt-2 text-white">Выполните условия</h3>
                 <p className="text-sm text-zinc-500 mb-4">Осталось 100 аккаунтов в этой волне</p>
                 
                 {/* Demo Toggle Blocked */}
                 <button onClick={() => setIsBlocked(true)} className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400">
                    [Симуляция: Блокировка Anti-Twin]
                 </button>
              </div>
           ) : (
              <div className="text-center mb-6">
                 <h3 className="text-xl font-semibold mb-1 text-white">Призовой фонд</h3>
                 <p className="text-sm text-zinc-500">10 мест • Завершение 14 Мая</p>
              </div>
           )}

           <button 
             onClick={handleParticipate}
             disabled={!canParticipate || participatingState !== 'idle'}
             className={cn(
               "w-full font-semibold py-4 rounded-2xl transition-all shadow-lg flex justify-center items-center gap-2 relative overflow-hidden",
               participatingState === 'success' 
                 ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 shadow-emerald-500/10 pointer-events-none" 
                 : !canParticipate 
                   ? "bg-zinc-800 text-zinc-400 opacity-50 cursor-not-allowed" 
                   : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40 border border-blue-500 active:scale-[0.98]"
             )}
           >
             {participatingState === 'success' && (
                <motion.div 
                  initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1, ease: "easeInOut" }} 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent skew-x-12" 
                />
             )}
             {participatingState === 'loading' ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full" />
             ) : participatingState === 'success' ? (
                <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                   <CheckCircle2 size={20} /> Вы участвуете
                </motion.span>
             ) : (isGiveaway ? "Забрать аккаунт" : "Участвовать в розыгрыше")}
           </button>
        </div>

      </div>
    </div>
  );
}

function ConditionRow({ label, desc, isDone, onComplete }: { label: string, desc: string, isDone: boolean, onComplete?: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete?.();
    }, 1000);
  };

  return (
    <div className="flex items-center gap-4 group">
      <div className={cn(
        "w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all",
        isDone ? "bg-emerald-500/10 border-emerald-500/30" : "bg-zinc-950 border-zinc-800"
      )}>
        {isDone ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle2 size={20} className="text-emerald-500" />
          </motion.div>
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 transition-colors"></div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-zinc-200">{label}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
      </div>
      {!isDone && (
         <button 
           onClick={handleComplete}
           disabled={loading}
           className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-colors min-w-[90px] flex justify-center"
         >
           {loading ? (
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
           ) : "Выполнить"}
         </button>
      )}
    </div>
  )
}
