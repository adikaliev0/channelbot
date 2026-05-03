import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Gift, Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const isGiveaway = id?.startsWith('ga');

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
              done={true} 
            />
            <div className="h-px w-full bg-zinc-800/50"></div>
            <ConditionRow 
              label="Привязка Telegram Premium" 
              desc="Для защиты от ботов" 
              done={false} 
            />
          </div>
        </div>

        {/* Action State */}
        <div className="mt-auto">
           {isGiveaway ? (
              <div className="text-center mb-6">
                 <div className="inline-flex items-center justify-center gap-2 text-zinc-400 text-sm font-medium mb-4 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 absolute transition">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   Волна 2 активна
                 </div>
                 <h3 className="text-xl font-semibold mb-1 mt-10 text-white">Выполните условия</h3>
                 <p className="text-sm text-zinc-500">Осталось 100 аккаунтов в этой волне</p>
              </div>
           ) : (
              <div className="text-center mb-6">
                 <h3 className="text-xl font-semibold mb-1 text-white">Призовой фонд</h3>
                 <p className="text-sm text-zinc-500">10 мест • Завершение 14 Мая</p>
              </div>
           )}

           <button className="w-full bg-zinc-800 text-zinc-400 font-semibold py-4 rounded-2xl opacity-50 cursor-not-allowed">
             Участвовать
           </button>
        </div>

      </div>
    </div>
  );
}

function ConditionRow({ label, desc, done }: { label: string, desc: string, done: boolean }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 transition-colors">
        {done ? (
          <CheckCircle2 size={20} className="text-emerald-500" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors"></div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-zinc-200">{label}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
      </div>
      {!done && (
         <button className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg">Выполнить</button>
      )}
    </div>
  )
}
