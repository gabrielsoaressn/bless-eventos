import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, FilePlus, Crown } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard BI', icon: LayoutDashboard },
  { to: '/contratos', label: 'Gestao de Contratos', icon: FileText },
  { to: '/novo-contrato', label: 'Novo Contrato', icon: FilePlus },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-gold to-gold-dark p-1.5 rounded-lg">
            <Crown size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">Bless Eventos</h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest">ERP de Eventos</p>
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
                  ? 'bg-gold/20 text-gold'
                  : 'text-slate-400 hover:bg-sidebar-hover hover:text-slate-200'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-slate-600 text-xs">v3.0 ERP</p>
      </div>
    </aside>
  )
}
