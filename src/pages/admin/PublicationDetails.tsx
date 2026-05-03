import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Gift, ShieldAlert, Activity, StopCircle, RefreshCw, Settings, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useState } from "react";

export default function PublicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Обзор' | 'Участники' | 'Логи'>('Обзор');

  // Hardcoded mock for GA-402
  const pub = {
    id: id || 'GA-402',
    title: 'Раздача Premium аккаунтов',
    type: 'Giveaway',
    status: 'Active',
    totalAccounts: 500,
    issued: 350,
    reserve: 50,
    remaining: 100,
    wave: 2,
    participants: 1250,
  };

  const progress = (pub.issued / pub.totalAccounts) * 100;

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 pt-safe px-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-sm font-semibold tracking-tight leading-tight">{pub.title}</h1>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{pub.id} • {pub.type}</span>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800/50 w-full overflow-hidden">
          {(['Обзор', 'Участники', 'Логи'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 pb-2 text-xs font-semibold uppercase tracking-widest relative"
            >
              <span className={activeTab === tab ? "text-white" : "text-zinc-500"}>{tab}</span>
              {activeTab === tab && (
                <motion.div 
                  layoutId="details-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === 'Обзор' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Status Banner */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <div className="flex-1">
                  <h3 className="text-emerald-400 font-semibold text-sm">Волна {pub.wave} активна</h3>
                  <p className="text-emerald-400/60 text-xs mt-0.5">Выдача аккаунтов проверенным пользователям</p>
                </div>
              </div>

              {/* Progress */}
              <section>
                <div className="flex justify-between items-end mb-2">
                  <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest">Прогресс</h2>
                  <span className="text-[10px] font-mono text-zinc-500">{pub.issued} / {pub.totalAccounts} выдано</span>
                </div>
                <div className="h-4 bg-zinc-900 rounded-full border border-zinc-800 p-[1px] relative overflow-hidden flex">
                  {/* Issued */}
                  <div className="h-full bg-blue-500 rounded-full relative z-10" style={{ width: `${progress}%` }}></div>
                   {/* Remaining (empty space implicitly shows this) */}
                </div>
                <div className="flex justify-between items-center mt-3 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                     <span className="w-2 h-2 rounded-full bg-blue-500"></span> Выдано ({pub.issued})
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                     <span className="w-2 h-2 rounded-full bg-amber-500"></span> Резерв ({pub.reserve})
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                     <span className="w-2 h-2 rounded-full bg-zinc-700"></span> Остаток ({pub.remaining})
                  </div>
                </div>
              </section>

              {/* Controls */}
              <section>
                <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest mb-3">Ручное управление</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 hover:text-blue-400 text-zinc-300 transition-colors rounded-xl p-4 flex flex-col items-center gap-2">
                    <RefreshCw size={20} />
                    <span className="text-xs font-medium">След. волна</span>
                  </button>
                  <button className="bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors rounded-xl p-4 flex flex-col items-center gap-2">
                    <StopCircle size={20} />
                    <span className="text-xs font-medium">Остановить</span>
                  </button>
                </div>
              </section>

              {/* Security Snapshot */}
              <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                 <div className="flex justify-between items-center mb-4">
                   <h2 className="text-xs font-semibold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                     <ShieldAlert size={14} className="text-zinc-400" /> Безопасность
                   </h2>
                   <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">Anti-Twin активен</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-zinc-800/50 pb-3 mb-3">
                    <span className="text-sm text-zinc-400">Заблокированные попытки</span>
                    <span className="text-sm font-semibold text-rose-400">42</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Ошибки капчи</span>
                    <span className="text-sm font-semibold text-orange-400">18</span>
                 </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'Участники' && (
            <motion.div 
               key="participants"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="text-center py-12 text-zinc-500"
            >
              <Users size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Загружено 1,250 участников.</p>
              <button className="mt-4 text-xs font-semibold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-4 py-2 rounded-full">Экспорт в CSV</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
