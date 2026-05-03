import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
      className={cn("bg-zinc-800/40 rounded-xl", className)}
      {...props}
    />
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl">
      <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 flex flex-col justify-between min-h-[120px]">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="w-12 h-4 rounded-md" />
      </div>
      <div className="space-y-2 mt-auto">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}
