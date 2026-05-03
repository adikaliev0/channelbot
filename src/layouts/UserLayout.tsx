import { Outlet, NavLink } from "react-router";
import { User, Key, Ticket, ShieldAlert } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export default function UserLayout() {
  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-[88px]">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/50 flex justify-center">
        <nav className="flex items-center justify-around w-full max-w-md gap-1">
          <NavItem to="/user" icon={<User size={22} />} label="Кабинет" end />
          {/* Mock routes for demo, they point to a demo event */}
          <NavItem to="/user/event/ga-402" icon={<Key size={22} />} label="Раздачи" />
          <NavItem to="/user/event/rf-108" icon={<Ticket size={22} />} label="Розыгрыши" />
          
          {/* Quick toggle to admin for demo purposes */}
          <NavItem to="/admin" icon={<ShieldAlert size={22} />} label="Админ" />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, end }: { to: string; icon: React.ReactNode; label: string, end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300",
          isActive ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative z-10 flex flex-col items-center gap-1">
            {icon}
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </div>
          {isActive && (
            <motion.div
              layoutId="user-nav-indicator"
              className="absolute inset-0 bg-blue-500/10 rounded-xl"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}
