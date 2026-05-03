import { Outlet, NavLink, useLocation } from "react-router";
import { LayoutDashboard, FileText, ShieldAlert, Users, PlusCircle, UserCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export default function AdminLayout() {
  const location = useLocation();
  const isCreatePage = location.pathname === '/admin/publications/create';

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-[88px]">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar */}
      {!isCreatePage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800/50 flex justify-center">
          <nav className="flex items-center justify-between w-full max-w-md gap-1">
            <NavItem to="/admin" icon={<LayoutDashboard size={22} />} label="Главная" end />
            <NavItem to="/admin/publications" icon={<FileText size={22} />} label="Посты" />
            
            {/* Contextual FAB-like button for creation */}
            <div className="relative -mt-6 px-2">
              <NavLink 
                to="/admin/publications/create"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all"
              >
                <PlusCircle size={26} strokeWidth={2.5} />
              </NavLink>
            </div>

            <NavItem to="/admin/antifraud" icon={<ShieldAlert size={22} />} label="АнтиФрод" />
            
            {/* Toggle to User Mode for Demo */}
            <NavItem to="/user" icon={<UserCircle size={22} />} label="Юзер" />
          </nav>
        </div>
      )}
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
              layoutId="nav-indicator"
              className="absolute inset-0 bg-blue-500/10 rounded-xl"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}
