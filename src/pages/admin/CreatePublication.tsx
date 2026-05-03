import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Gift, Ticket, HelpCircle, Gavel, LayoutList, ChevronRight, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate, useSearchParams } from "react-router";

type PubType = 'giveaway' | 'raffle' | 'quiz' | 'auction' | 'post' | null;

const TYPES = [
  { id: 'giveaway', label: 'Раздача', icon: Gift, color: 'text-purple-400', bg: 'bg-purple-900/20' },
  { id: 'raffle', label: 'Розыгрыш', icon: Ticket, color: 'text-blue-400', bg: 'bg-blue-900/20' },
  { id: 'quiz', label: 'Квиз', icon: HelpCircle, color: 'text-amber-400', bg: 'bg-amber-900/20' },
  { id: 'auction', label: 'Аукцион', icon: Gavel, color: 'text-orange-400', bg: 'bg-orange-900/20' },
  { id: 'post', label: 'Обычный пост', icon: LayoutList, color: 'text-zinc-400', bg: 'bg-zinc-800' },
];

export default function CreatePublication() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') as PubType;
  
  const [step, setStep] = useState(initialType ? 2 : 1);
  const [type, setType] = useState<PubType>(initialType || null);

  const handleTypeSelect = (t: PubType) => {
    setType(t);
    setStep(2);
  };

  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      navigate(-1);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950">
      {/* Header */}
      <header className="flex-none pt-safe px-4 py-3 flex items-center justify-between bg-zinc-950 sticky top-0 z-10 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => step > 1 ? setStep(1) : navigate(-1)}
            disabled={isPublishing}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={18} />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-white">
            {step === 1 ? 'Новая публикация' : (
              type === 'giveaway' ? 'Новая раздача' :
              type === 'raffle' ? 'Новый розыгрыш' :
              type === 'quiz' ? 'Новый квиз' :
              type === 'auction' ? 'Новый аукцион' :
              type === 'post' ? 'Новый пост' : 'Новая публикация'
            )}
          </h1>
        </div>
        {step === 2 && (
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className={cn(
              "text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest transition-colors flex items-center justify-center min-w-[140px]",
              isPublishing 
                ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700" 
                : "text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20"
            )}
          >
            {isPublishing ? (
               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full" />
            ) : "Опубликовать"}
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait" initial={false}>
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Выберите тип</h2>
                <p className="text-sm text-zinc-400">Выберите формат предстоящего события или поста.</p>
              </div>

              <div className="grid gap-3">
                {TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTypeSelect(t.id as PubType)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors text-left"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", t.bg)}>
                        <Icon size={24} className={t.color} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold">{t.label}</h3>
                      </div>
                      <ChevronRight size={20} className="text-zinc-500" />
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-6 pb-24"
            >
              {/* Common properties */}
              <section className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest pl-1">Название</label>
                  <input 
                    type="text" 
                    placeholder="Введите привлекательное название..." 
                    className="w-full mt-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest pl-1">Описание</label>
                  <textarea 
                    placeholder="Опишите правила, призы или просто поздоровайтесь..." 
                    rows={4}
                    className="w-full mt-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>
              </section>

              {/* Type-specific builder sections */}
              {type === 'giveaway' && <GiveawayBuilder />}
              {type === 'raffle' && <RaffleBuilder />}

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function GiveawayBuilder() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 border-t border-zinc-800/50 pt-6">
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-zinc-100 flex items-center gap-2 mb-3">
          <Gift size={16} className="text-purple-400"/> Настройки раздачи
        </h3>
        
        <div className="space-y-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <label className="text-sm font-medium">Авто-волны</label>
              <p className="text-[10px] text-zinc-400">Автоматически выдавать аккаунты</p>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full relative shadow-[0_0_10px_rgba(37,99,235,0.3)] shrink-0">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-4">
             <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">База аккаунтов</label>
             <button className="w-full mt-2 border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl py-3 text-sm text-blue-400 font-medium transition-colors">
               + Загрузить аккаунты (TXT/CSV)
             </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function RaffleBuilder() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 border-t border-zinc-800/50 pt-6">
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-zinc-100 flex items-center gap-2 mb-3">
          <Ticket size={16} className="text-blue-400"/> Настройки розыгрыша
        </h3>
        
        <div className="space-y-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest pl-1">Количество победителей</label>
            <input 
              type="number" 
              defaultValue={1}
              className="w-full mt-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest pl-1">Условие завершения</label>
            <div className="flex gap-2 mt-1.5">
              <button className="flex-1 bg-white text-black font-semibold text-xs py-2 rounded-lg border border-white">По времени</button>
              <button className="flex-1 bg-zinc-950 text-zinc-400 font-medium text-xs py-2 rounded-lg border border-zinc-800">По кол-ву участников</button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
