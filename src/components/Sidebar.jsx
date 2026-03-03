import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, FilePlus, Crown } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/contratos', label: 'Contratos', icon: FileText },
  { to: '/novo-contrato', label: 'Novo Contrato', icon: FilePlus },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar flex flex-col border-r border-dark-border">
      <div className="px-6 py-6 border-b border-dark-border">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-gold to-gold-dark p-1.5 rounded-lg">
            <Crown size={18} className="text-dark" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">Bless Eventos</h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Gestao Executiva</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-gold/20 to-gold/5 text-gold border border-gold/20'
                  : 'text-slate-400 hover:bg-sidebar-hover hover:text-slate-200 border border-transparent'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-dark-border">
        <p className="text-slate-600 text-xs">v2.0 Executive BI</p>
      </div>
    </aside>
  )
}
