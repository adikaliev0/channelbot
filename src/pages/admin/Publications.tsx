import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Gift, Ticket, HelpCircle, Gavel, LayoutList, ChevronRight, MoreVertical } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router";
import { SkeletonRow } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";

type PubType = 'Все' | 'Раздачи' | 'Розыгрыши' | 'Квизы' | 'Аукционы' | 'Посты';
type PubCategory = 'All' | 'Giveaway' | 'Raffle' | 'Quiz' | 'Auction' | 'Post';

const TAB_MAPPING: Record<PubType, PubCategory> = {
  'Все': 'All',
  'Раздачи': 'Giveaway',
  'Розыгрыши': 'Raffle',
  'Квизы': 'Quiz',
  'Аукционы': 'Auction',
  'Посты': 'Post'
};

const MOCK_DATA = [
  { id: 'GA-402', title: 'Раздача Premium аккаунтов', type: 'Giveaway', status: 'Активен', members: 1250, date: '12 Мая, 14:00' },
  { id: 'RF-108', title: 'Еженедельный VIP Pass', type: 'Raffle', status: 'Активен', members: 3840, date: '11 Мая, 09:00' },
  { id: 'QZ-055', title: 'Проверка знаний Tarkov', type: 'Quiz', status: 'Завершен', members: 890, date: '10 Мая, 18:30' },
  { id: 'AU-012', title: 'Аукцион на крутой ID', type: 'Auction', status: 'Черновик', members: 0, date: 'Ожидает' },
  { id: 'GA-401', title: 'Раздача стандартных ключей', type: 'Giveaway', status: 'Завершен', members: 5000, date: '08 Мая, 12:00' },
  { id: 'SP-001', title: 'Новости и обновления', type: 'Post', status: 'Активен', members: 0, date: '08 Мая, 10:00' },
];

export default function Publications() {
  const [activeTab, setActiveTab] = useState<PubType>('Все');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeTab]);

  const filtered = MOCK_DATA.filter(p => {
    const targetType = TAB_MAPPING[activeTab];
    if (targetType !== 'All' && p.type !== targetType) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 pt-safe px-4 pb-3 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Публикации</h1>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
            <Filter size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Поиск по ID или названию..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Segmented Control / Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
          {(Object.keys(TAB_MAPPING) as PubType[]).map(tab => (
             <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                activeTab === tab 
                  ? "bg-white text-black border-white" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              )}
             >
               {tab}
             </button>
          ))}
        </div>
      </header>

      {/* List */}
      <div className="p-4 space-y-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {loading ? (
             <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
               <SkeletonRow />
               <SkeletonRow />
               <SkeletonRow />
               <SkeletonRow />
             </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <EmptyState 
                icon={<LayoutList size={32} />}
                title="Ничего не найдено"
                description={search ? "Попробуйте изменить поисковой запрос" : `В категории «${activeTab}» пока нет публикаций`}
                fullHeight
              />
            </motion.div>
          ) : (
            filtered.map((pub) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={pub.id}
              >
                <PublicationRow {...pub} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PublicationRow({ id, title, type, status, members, date }: any) {
  const getIcon = () => {
    switch(type) {
      case 'Giveaway': return <Gift size={16} className="text-purple-400" />;
      case 'Raffle': return <Ticket size={16} className="text-blue-400" />;
      case 'Quiz': return <HelpCircle size={16} className="text-amber-400" />;
      case 'Auction': return <Gavel size={16} className="text-orange-400" />;
      default: return <LayoutList size={16} className="text-zinc-400" />;
    }
  };

  const getStatusColor = () => {
    if (status === 'Активен') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (status === 'Черновик') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-zinc-800 text-zinc-400 border-zinc-700/50';
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-4 transition-colors hover:border-zinc-700">
      <Link to={`/admin/publications/${id}`} className="absolute inset-0 z-10" />
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center shrink-0 border border-zinc-800">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-medium text-white line-clamp-1">{title}</h3>
            <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border whitespace-nowrap", getStatusColor())}>
              {status}
            </span>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">{id}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-zinc-400">
            {members > 0 && <span>👤 {members.toLocaleString()}</span>}
            <span>🗓 {date}</span>
          </div>
        </div>
        <div className="relative z-20 self-center">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
