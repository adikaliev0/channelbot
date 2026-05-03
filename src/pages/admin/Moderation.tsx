import { Search, ShieldBan, MoreVertical, ShieldX, CheckCircle, SearchX } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

type Ban = {
  userId: string;
  username: string;
  reason: string;
  date: string;
  admin: string;
}

const MOCK_BANS: Ban[] = [
  { userId: '1029381', username: 'scripter_pro', reason: 'Автоматизированная сеть ботов (Anti-Twin)', date: '12 Мая 2024', admin: '@adixxlee' },
  { userId: '5581902', username: 'free_accs', reason: 'Множественные твинки (вручную)', date: '11 Мая 2024', admin: 'Auto-Mod' },
  { userId: '9123841', username: 'anonymous_ghost', reason: 'Использование подозрительных прокси', date: '10 Мая 2024', admin: 'Auto-Mod' },
];

export default function Moderation() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [isUnbanning, setIsUnbanning] = useState(false);
  const [bannedList, setBannedList] = useState(MOCK_BANS);
  
  const filtered = bannedList.filter(b => 
    b.userId.includes(search) || b.username.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleUnban = () => {
    setIsUnbanning(true);
    setTimeout(() => {
      setIsUnbanning(false);
      setBannedList(prev => prev.filter(b => !selected.includes(b.userId)));
      setSelected([]);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 pt-safe px-4 pb-3 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
               <ShieldBan size={16} />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Список банов</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Поиск по UID, никнейму, IP..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50"
          />
        </div>
      </header>

      {/* Mass Actions Bar */}
      <AnimatePresence>
        {selected.length > 0 && (
           <motion.div 
             initial={{ y: -50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: -50, opacity: 0 }}
             className="sticky top-[108px] z-30 bg-blue-600 px-4 py-3 flex items-center justify-between shadow-lg"
           >
             <span className="text-white text-sm font-semibold">Выбрано: {selected.length}</span>
             <div className="flex items-center gap-2">
               <button 
                 onClick={() => !isUnbanning && setSelected([])}
                 disabled={isUnbanning}
                 className="px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white disabled:opacity-50"
               >
                 Отмена
               </button>
               <button 
                 onClick={handleUnban}
                 disabled={isUnbanning}
                 className="min-w-[124px] px-3 py-1.5 bg-white text-blue-600 text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 disabled:bg-white/80"
               >
                 {isUnbanning ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full" />
                 ) : "Разбанить всех"}
               </button>
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 space-y-2">
        <AnimatePresence mode="popLayout">
           {filtered.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="py-12 text-center flex flex-col items-center justify-center text-zinc-500"
             >
               <SearchX size={32} className="mb-3 opacity-20" />
               <p className="text-sm">Записи не найдены.</p>
             </motion.div>
           ) : (
             filtered.map((ban) => (
                <motion.div 
                  key={ban.userId}
                  layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                >
                  <BanRow 
                    ban={ban} 
                    isSelected={selected.includes(ban.userId)}
                    onSelect={() => toggleSelect(ban.userId)}
                  />
                </motion.div>
             ))
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BanRow({ ban, isSelected, onSelect }: { ban: Ban, isSelected: boolean, onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className={cn(
        "group relative border rounded-2xl p-4 transition-all cursor-pointer",
        isSelected 
          ? "bg-blue-500/5 border-blue-500/30 ring-1 ring-blue-500/30" 
          : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <div className={cn(
            "w-5 h-5 rounded flex items-center justify-center border transition-colors",
            isSelected ? "bg-blue-500 border-blue-500 text-white" : "border-zinc-700 bg-zinc-800/50"
          )}>
            {isSelected && <CheckCircle size={14} />}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white truncate">@{ban.username}</h3>
             <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.5 rounded font-mono">ЗАБАНЕН</span>
          </div>
          <p className="text-[11px] font-mono text-zinc-500 mb-2">UID: {ban.userId}</p>
          <div className="bg-zinc-950/50 rounded-lg p-2.5 mb-2 border border-zinc-800/50 text-xs text-zinc-300">
            <span className="text-zinc-500 font-mono text-[10px] block mb-0.5">ПРИЧИНА</span>
            {ban.reason}
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium tracking-wide">
            <span>By: {ban.admin}</span>
            <span>{ban.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
