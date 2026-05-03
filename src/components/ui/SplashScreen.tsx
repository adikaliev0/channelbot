import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-zinc-950 px-4"
          >
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-[1px] mb-6 shadow-2xl shadow-blue-900/20">
                 <div className="w-full h-full bg-zinc-950 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "Inter" }}>M.</span>
                 </div>
              </div>
              
              <div className="flex flex-col items-center justify-center gap-3">
                 <div className="h-1 w-32 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                       className="h-full bg-zinc-500 rounded-full"
                       initial={{ width: "0%" }}
                       animate={{ width: "100%" }}
                       transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                 </div>
                 <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Загрузка данных...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* We only render children once the splash exits, or we can render them behind it. 
          Rendering behind helps preload resources. Let's make children visible but maybe inert?
          We'll just render it behind. */}
      {children}
    </>
  );
}
