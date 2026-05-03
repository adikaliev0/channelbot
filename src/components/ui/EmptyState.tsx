import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function EmptyState({ icon, title, description, action, className, fullHeight }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center bg-zinc-950/50 border border-zinc-800/50 rounded-3xl", 
        fullHeight && "min-h-[60vh]",
        className
      )}
    >
      <div className="w-16 h-16 mb-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-inner">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-5 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
