import { ShieldAlert, AlertTriangle, Fingerprint, MapPin, Users, History, Check, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "../../lib/utils";

type Tab = 'Активные угрозы' | 'История';

type Alert = {
  id: string;
  user: string;
  userId: string;
  risk: 'Высокий' | 'Средний';
  reason: string;
  ip: string;
  device: string;
  linkedAccounts: number;
  time: string;
}

const MOCK_ALERTS: Alert[] = [
  { id: 'AL-901', user: 'alex_winner', userId: '849102', risk: 'Высокий', reason: 'Одинаковый IP и отпечаток устройства', ip: '192.168.1.1', device: 'iOS - Safari', linkedAccounts: 4, time: '2м назад' },
  { id: 'AL-902', user: 'crypto_god', userId: '55102', risk: 'Средний', reason: 'Высокая скорость (подозрение на скрипт)', ip: '45.22.11.9', device: 'Win - Chrome', linkedAccounts: 1, time: '15м назад' },
];

export default function AntiFraud() {
  const [activeTab, setActiveTab] = useState<Tab>('Активные угрозы');

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 pt-safe px-4 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Anti-Twin Engine</h1>
            <p className="text-[11px] font-mono text-zinc-500 uppercase">Система активна • 2 Угрозы</p>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 relative">
          {(['Активные угрозы', 'История'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-1.5 text-xs font-semibold relative z-10 transition-colors"
            >
              <span className={activeTab === tab ? "text-white" : "text-zinc-500"}>{tab}</span>
              {activeTab === tab && (
                <motion.div 
                  layoutId="antifraud-tab"
                  className="absolute inset-0 bg-zinc-800 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {activeTab === 'Активные угрозы' && MOCK_ALERTS.map((alert) => (
             <motion.div 
               key={alert.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               layout
             >
               <FraudAlertCard alert={alert} />
             </motion.div>
          ))}
          {activeTab === 'История' && (
             <motion.div 
               key="history"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-12 text-zinc-500"
             >
               <History size={32} className="mx-auto mb-3 opacity-20" />
               <p className="text-sm">Нет недавней истории.</p>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FraudAlertCard({ alert }: { alert: Alert }) {
  const isHigh = alert.risk === 'Высокий';

  return (
    <div className={cn(
      "rounded-2xl border overflow-hidden",
      isHigh ? "bg-rose-950/20 border-rose-900/50" : "bg-amber-950/20 border-amber-900/50"
    )}>
      {/* Header Info */}
      <div className="p-4 border-b border-zinc-800/50">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border",
              isHigh ? "bg-rose-500/10 text-rose-400 border-rose-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            )}>
              {alert.risk} Риск
            </span>
            <span className="text-[10px] font-mono text-zinc-500">{alert.time}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">{alert.id}</span>
        </div>
        
        <h3 className="text-sm font-semibold text-white mb-1">@{alert.user} <span className="text-zinc-500 font-mono text-xs font-normal">({alert.userId})</span></h3>
        <p className={cn("text-xs font-medium", isHigh ? "text-rose-400" : "text-amber-400")}>{alert.reason}</p>
      </div>

      {/* Context Grid */}
      <div className="p-4 grid grid-cols-2 gap-3 bg-zinc-950/50">
        <ContextItem icon={<MapPin size={12} />} label="IP Адрес" value={alert.ip} />
        <ContextItem icon={<Fingerprint size={12} />} label="Устройство" value={alert.device} />
        {alert.linkedAccounts > 1 && (
          <div className="col-span-2">
             <ContextItem icon={<Users size={12} />} label="Связанные аккаунты" value={`${alert.linkedAccounts} совпадений`} highlight />
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="p-3 border-t border-zinc-800/50 flex gap-2">
        <button className="flex-1 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
          <Check size={14} className="text-emerald-400" /> Доверять
        </button>
        <button className={cn(
          "flex-[2] py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border",
          isHigh ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20" : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        )}>
          <XCircle size={14} /> 
          {alert.linkedAccounts > 1 ? `Забанить всех (${alert.linkedAccounts})` : 'Забанить'}
        </button>
      </div>
    </div>
  )
}

function ContextItem({ icon, label, value, highlight }: { icon: React.ReactNode, label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <div className={cn("mt-0.5", highlight ? "text-rose-400" : "text-zinc-500")}>{icon}</div>
      <div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{label}</div>
        <div className={cn("text-xs font-mono mt-0.5", highlight ? "text-rose-400 font-semibold" : "text-zinc-300")}>{value}</div>
      </div>
    </div>
  )
}
