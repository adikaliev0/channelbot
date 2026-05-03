import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, CheckCircle2, ShieldAlert, Fingerprint, Activity, ServerCog } from "lucide-react";
import { cn } from "../../lib/utils";

type StepStatus = 'waiting' | 'loading' | 'success' | 'error';

interface CheckStep {
  id: string;
  label: string;
  icon: React.ElementType;
}

const STEPS: CheckStep[] = [
  { id: 'event', label: 'Доступность публикации', icon: ServerCog },
  { id: 'profile', label: 'Проверка профиля', icon: Fingerprint },
  { id: 'antitwin', label: 'Анализ (Anti-Twin)', icon: Activity },
  { id: 'limits', label: 'Ограничения участия', icon: ShieldAlert },
];

export function PreCheck({ onComplete, onFail }: { onComplete: () => void, onFail: (reason: string) => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({
    event: 'waiting',
    profile: 'waiting',
    antitwin: 'waiting',
    limits: 'waiting'
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    
    const runChecks = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (isCancelled) return;
        const step = STEPS[i];
        
        setCurrentStepIndex(i);
        setStepStatuses(prev => ({ ...prev, [step.id]: 'loading' }));
        
        // Dynamic wait time to feel realistic
        const waitTime = 600 + Math.random() * 800;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        if (isCancelled) return;
        setStepStatuses(prev => ({ ...prev, [step.id]: 'success' }));
      }
      
      if (isCancelled) return;
      setIsFinished(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!isCancelled) onComplete();
    };

    runChecks();

    return () => { isCancelled = true; };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl mb-6 relative">
             <div className="absolute inset-0 rounded-2xl border border-blue-500/20 blur-sm"></div>
             {isFinished ? (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                 <ShieldCheck size={32} className="text-emerald-500" />
               </motion.div>
             ) : (
               <ShieldCheck size={32} className="text-blue-500" />
             )}
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight text-center">
            {isFinished ? "Проверка завершена" : "Верификация доступа"}
          </h2>
          <p className="text-sm text-zinc-500 mt-2 text-center">
            Защищенное подключение VaultDrop
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl p-5 space-y-4">
          {STEPS.map((step, idx) => {
            const status = stepStatuses[step.id];
            const Icon = step.icon;
            const isCurrent = currentStepIndex === idx && !isFinished;
            
            return (
              <div 
                key={step.id} 
                className={cn(
                  "flex items-center gap-3 transition-opacity duration-300",
                  status === 'waiting' && !isCurrent ? "opacity-30" : "opacity-100"
                )}
              >
                <div className="relative w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 bg-zinc-950">
                  {status === 'loading' && (
                     <motion.div 
                       animate={{ rotate: 360 }} 
                       transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
                       className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-blue-500" 
                     />
                  )}
                  {status === 'success' ? (
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                     </motion.div>
                  ) : (
                     <Icon size={14} className={status === 'loading' ? 'text-blue-400' : 'text-zinc-600'} />
                  )}
                </div>
                <div className="flex-1">
                  <div className={cn(
                    "text-sm font-medium transition-colors",
                    status === 'success' ? "text-zinc-300" :
                    status === 'loading' ? "text-white" :
                    "text-zinc-600"
                  )}>
                    {step.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
}
