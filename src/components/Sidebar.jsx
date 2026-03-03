import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, FilePlus } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/contratos', label: 'Contratos', icon: FileText },
  { to: '/novo-contrato', label: 'Novo Contrato', icon: FilePlus },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-white font-bold text-xl tracking-tight">Bless Eventos</h1>
        <p className="text-slate-400 text-xs mt-1">Gestão de Contratos</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-300 hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-slate-500 text-xs">v1.0 MVP</p>
      </div>
    </aside>
  )
}
