import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  AlertTriangle, 
  Gift, 
  Ticket, 
  TrendingUp, 
  Users, 
  Activity, 
  MoreHorizontal,
  ChevronRight,
  ShieldAlert,
  PlayCircle,
  HelpCircle,
  Gavel
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router";
import { Skeleton, SkeletonRow, SkeletonCard } from "../../components/ui/Skeleton";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 pt-safe px-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">M.App Админ</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Система в сети</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 overflow-hidden">
          {loading ? (
             <Skeleton className="w-full h-full" />
          ) : (
             <img 
               src="https://api.dicebear.com/7.x/notionists/svg?seed=adixxlee" 
               alt="Admin" 
               className="w-full h-full object-cover"
             />
          )}
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Needs Attention Block */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest">Требует Внимания</h2>
          </div>
          {loading ? (
            <div className="grid gap-3">
               <SkeletonCard />
            </div>
          ) : (
            <div className="grid gap-3">
              <AttentionCard 
                icon={<ShieldAlert className="text-amber-500" size={18} />}
                title="Подозрительная активность"
                description="3 аккаунта отмечены за одинаковые IP в текущей раздаче #402."
                action="Проверить"
                type="warning"
                link="/admin/antifraud"
              />
              <AttentionCard 
                icon={<AlertTriangle className="text-rose-500" size={18} />}
                title="Закончились аккаунты"
                description="В посте #401 закончились прикрепленные аккаунты, ожидают 12 пользователей."
                action="Добавить"
                type="danger"
                link="/admin/publications/401"
              />
            </div>
          )}
        </section>

        {/* Key Metrics */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest">Обзор</h2>
            <Link to="/admin/publications" className="text-xs text-blue-500 hover:text-blue-400 font-medium">Все</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {loading ? (
               <>
                 <Skeleton className="h-24 rounded-2xl" />
                 <Skeleton className="h-24 rounded-2xl" />
                 <Skeleton className="h-24 rounded-2xl" />
                 <Skeleton className="h-24 rounded-2xl" />
               </>
            ) : (
               <>
                 <MetricCard 
                   title="Активных раздач" 
                   value="2" 
                   trend="+1" 
                   icon={<Gift size={16} className="text-purple-400" />} 
                 />
                 <MetricCard 
                   title="Активных розыгрышей" 
                   value="1" 
                   trend="без изм." 
                   icon={<Ticket size={16} className="text-blue-400" />} 
                 />
                 <MetricCard 
                   title="Посетителей (24ч)" 
                   value="4,209" 
                   trend="+12%" 
                   icon={<Users size={16} className="text-emerald-400" />} 
                 />
                 <MetricCard 
                   title="Заблокировано" 
                   value="84" 
                   trend="-5%" 
                   icon={<ShieldAlert size={16} className="text-rose-400" />} 
                 />
               </>
            )}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest mb-3">Быстрые действия</h2>
          <div className="grid grid-cols-4 gap-2">
            <QuickAction icon={<Gift />} label="Раздача" to="/admin/publications/create?type=giveaway" />
            <QuickAction icon={<Ticket />} label="Розыгрыш" to="/admin/publications/create?type=raffle" />
            <QuickAction icon={<HelpCircle />} label="Квиз" to="/admin/publications/create?type=quiz" />
            <QuickAction icon={<Gavel />} label="Аукцион" to="/admin/publications/create?type=auction" />
          </div>
        </section>

        {/* Active Publications Compact List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest">Активные события</h2>
          </div>
          <div className="space-y-2">
            {loading ? (
               <>
                 <SkeletonRow />
                 <SkeletonRow />
               </>
            ) : (
               <>
                 <ActiveEventRow 
                   id="GA-402" 
                   title="Раздача Premium аккаунтов"
                   type="Giveaway"
                   progress={80}
                   status="Волна 2"
                   participants={1250}
                 />
                 <ActiveEventRow 
                   id="RF-108" 
                   title="Еженедельный VIP Pass"
                   type="Raffle"
                   progress={45}
                   status="Сбор участников"
                   participants={3840}
                 />
               </>
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest mb-3">Последние действия</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 overflow-hidden">
            <div className="space-y-4">
              {loading ? (
                <>
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-8 w-5/6" />
                </>
              ) : (
                <>
                  <ActivityItem 
                    time="10м назад" 
                    text="Раздача #401 автоматически завершена." 
                    type="success"
                  />
                  <ActivityItem 
                    time="1ч назад" 
                    text="Админ @adixxlee забанил 12 ботов." 
                    type="admin"
                  />
                  <ActivityItem 
                    time="2ч назад" 
                    text="Запущена новая волна в GA-402." 
                    type="system"
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function AttentionCard({ icon, title, description, action, type, link }: { icon: React.ReactNode, title: string, description: string, action: string, type: 'warning' | 'danger', link: string }) {
  return (
    <Link to={link}>
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-2xl p-4 border flex flex-col gap-3 relative overflow-hidden",
          type === 'warning' ? "bg-amber-500/5 border-amber-500/20" : "bg-rose-500/5 border-rose-500/20"
        )}
      >
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-xl",
            type === 'warning' ? "bg-amber-500/10" : "bg-rose-500/10"
          )}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className={cn(
              "font-medium text-sm",
              type === 'warning' ? "text-amber-400" : "text-rose-400"
            )}>{title}</h3>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <span className={cn(
            "text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg",
            type === 'warning' ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"
          )}>
            {action}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function MetricCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  const isPositive = trend.startsWith('+');
  const isNegative = trend.startsWith('-');
  const isNeutral = !isPositive && !isNegative;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div className="p-1.5 bg-zinc-800/50 rounded-lg">{icon}</div>
        <span className={cn(
          "text-[10px] font-mono px-1.5 py-0.5 rounded-md",
          isPositive ? "bg-emerald-500/10 text-emerald-400" : 
          isNegative ? "bg-rose-500/10 text-rose-400" : 
          "bg-zinc-800 text-zinc-400"
        )}>
          {trend}
        </span>
      </div>
      <div className="mt-auto">
        <div className="text-2xl font-light tracking-tight text-white">{value}</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{title}</div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, to }: { icon: React.ReactNode, label: string, to: string }) {
  return (
    <Link to={to} className="flex flex-col items-center">
      <motion.div 
        whileTap={{ scale: 0.9 }}
        className="w-[4.5rem] h-[4.5rem] bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
      >
        <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
        <span className="text-[10px] font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}

function ActiveEventRow({ id, title, type, progress, status, participants }: { id: string, title: string, type: string, progress: number, status: string, participants: number }) {
  return (
    <Link to={`/admin/publications/${id}`} className="group block">
      <motion.div whileTap={{ scale: 0.98 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
          {type === 'Giveaway' ? <Gift size={18} className="text-purple-400" /> : <Ticket size={18} className="text-blue-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-medium text-white truncate pr-2">{title}</h4>
            <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">{id}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {status}
            </div>
            <span>{participants.toLocaleString()} уч.</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ActivityItem({ time, text, type }: { time: string, text: string, type: 'success' | 'admin' | 'system' }) {
  return (
    <div className="flex gap-3 relative">
      <div className="w-8 flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-zinc-700 mt-1.5 z-10 ring-4 ring-zinc-900"></div>
        <div className="w-px h-full bg-zinc-800 absolute top-3 left-[3px]"></div>
      </div>
      <div>
        <p className="text-xs font-mono text-zinc-500 mb-0.5">{time}</p>
        <p className="text-sm text-zinc-300">{text}</p>
      </div>
    </div>
  );
}
