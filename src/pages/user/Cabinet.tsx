import { motion } from "motion/react";
import { Key, Ticket, Copy, Check, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router";
import { Skeleton, SkeletonRow } from "../../components/ui/Skeleton";

export default function Cabinet() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 pt-safe px-4 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700 overflow-hidden relative">
            {loading ? (
               <Skeleton className="w-full h-full" />
            ) : (
               <img 
                 src="https://api.dicebear.com/7.x/notionists/svg?seed=user123" 
                 alt="User" 
                 className="w-full h-full object-cover"
               />
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{loading ? <Skeleton className="h-5 w-24 mb-1" /> : "Elden Lord"}</h1>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">{loading ? <Skeleton className="h-3 w-16" /> : "ID: 84910293"}</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
              <Key size={20} />
            </div>
            <div className="text-2xl font-light tracking-tight text-white mb-0.5">{loading ? <Skeleton className="h-6 w-8" /> : "14"}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Аккаунтов</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
              <Ticket size={20} />
            </div>
            <div className="text-2xl font-light tracking-tight text-white mb-0.5">{loading ? <Skeleton className="h-6 w-8" /> : "3"}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Побед</div>
          </div>
        </div>

        {/* Claimed Accounts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest">Полученные аккаунты</h2>
          </div>
          <div className="space-y-3">
            {loading ? (
               <>
                 <SkeletonRow />
                 <SkeletonRow />
               </>
            ) : (
               <>
                 {/* Account Card */}
                 <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                   <div className="p-3 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/50">
                     <Link to="/user/event/ga-402" className="flex items-center gap-2 group">
                       <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                       <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">Premium Accounts Drop</span>
                       <ChevronRight size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                     </Link>
                     <span className="text-[10px] font-mono text-zinc-500">12 Мая</span>
                   </div>
                   <div className="p-4 flex gap-3 items-center">
                     <div className="flex-1 overflow-hidden bg-black/40 rounded-xl p-3 border border-zinc-800/50 relative group">
                       <div className="text-xs font-mono text-zinc-300 truncate">
                         user_4910@mail.com:P@ssw0rd2024
                       </div>
                       <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent"></div>
                     </div>
                     <button 
                       onClick={() => copyToClipboard('acc1', 'user_4910@mail.com:P@ssw0rd2024')}
                       className={cn(
                         "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-all",
                         copiedId === 'acc1' 
                           ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                           : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                       )}
                     >
                       {copiedId === 'acc1' ? <Check size={16} /> : <Copy size={16} />}
                     </button>
                   </div>
                 </div>

                 {/* Account Card 2 */}
                 <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                   <div className="p-3 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/50">
                     <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                       <span className="text-xs font-medium text-zinc-300">Standard Keys Drop</span>
                     </div>
                     <span className="text-[10px] font-mono text-zinc-500">08 Мая</span>
                   </div>
                   <div className="p-4 flex gap-3 items-center">
                     <div className="flex-1 overflow-hidden bg-black/40 rounded-xl p-3 border border-zinc-800/50">
                       <div className="text-xs font-mono text-zinc-300 truncate">
                         key_99410-X29A
                       </div>
                     </div>
                     <button 
                       onClick={() => copyToClipboard('acc2', 'key_99410-X29A')}
                       className={cn(
                         "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-all",
                         copiedId === 'acc2' 
                           ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                           : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-400 hover:text-white"
                       )}
                     >
                       {copiedId === 'acc2' ? <Check size={16} /> : <Copy size={16} />}
                     </button>
                   </div>
                 </div>
               </>
            )}

          </div>
        </section>

        {/* Won Raffles */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest">Выигранные призы</h2>
          </div>
          <div className="space-y-3">
            {loading ? (
               <Skeleton className="h-20 w-full rounded-2xl" />
            ) : (
               <div className="bg-gradient-to-br from-zinc-900/50 to-blue-900/10 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 uppercase tracking-widest">1 Место</span>
                       <span className="text-[10px] font-mono text-zinc-500">11 Мая</span>
                    </div>
                    <h3 className="text-sm font-medium text-white">Еженедельный VIP Pass</h3>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-900/20">
                    Забрать
                  </button>
               </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}
