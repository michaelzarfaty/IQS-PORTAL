import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ClipboardList, 
  Users, 
  ShieldCheck, 
  FileText, 
  Handshake, 
  UsersRound,
  Receipt,
  RotateCcw,
  RefreshCw,
  Landmark,
  FileWarning,
  UserSquare2,
  ExternalLink,
  ChevronLeft,
  AlertTriangle,
  LogOut,
  Map,
  Settings as SettingsIcon,
  Download,
  User,
  BookOpen,
  Bell
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRole } from "@/lib/RoleContext";

const INTERNAL_ROLES = ['Super Admin', 'Admin', 'Compliance Manager', 'Employee', 'Sales'];

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  allowedRoles?: string[];
}

const SidebarItem = ({ icon, label, href, isActive, allowedRoles }: SidebarItemProps) => {
  const { role } = useRole();
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    return null;
  }

  const isExternal = href.startsWith('http');
  const className = `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive 
      ? "bg-primary/20 text-primary" 
      : "text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-white"
  }`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {icon}
        {label}
        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={className}
    >
      {icon}
      {label}
    </Link>
  );
};

interface SidebarGroupProps {
  title?: string;
  children: ReactNode;
  allowedRoles?: string[];
}

const SidebarGroup = ({ title, children, allowedRoles }: SidebarGroupProps) => {
  const { role } = useRole();
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    return null;
  }

  // Check if there are any visible children
  let hasVisibleChildren = false;
  if (Array.isArray(children)) {
    hasVisibleChildren = children.some(child => child !== null);
  } else if (children) {
    hasVisibleChildren = true;
  }

  // Only render the group if it has visible children or no children logic is applied
  // (In React, children might be objects that evaluate to null when rendered, 
  // but for simplicity we'll just render the group wrapper if children exist)

  return (
    <div className="mb-6">
      {title && (
        <h3 className="px-4 mb-2 text-xs font-semibold tracking-wider text-[hsl(var(--sidebar-fg))]/60 uppercase">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { role, setRole, logout } = useRole();

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] flex flex-col h-screen sticky top-0 border-r border-white/10">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <img src="https://vibe.filesafe.space/1783350442961167380/attachments/e73efa72-5bce-4447-8a3d-493aafd0ecec.png" alt="IQS Logo" className="h-8 object-contain" />
          </div>
        </div>
        
        <div className="px-6 pb-4">
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full bg-white/10 border border-white/20 text-white text-sm rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Super Admin" className="bg-slate-900">Super Admin View</option>
            <option value="Admin" className="bg-slate-900">Admin View</option>
            <option value="Compliance Manager" className="bg-slate-900">Compliance Manager</option>
            <option value="Employee" className="bg-slate-900">Employee View</option>
            <option value="Sales" className="bg-slate-900">Sales View</option>
            <option value="Client" className="bg-slate-900">Client Portal</option>
            <option value="Vendor" className="bg-slate-900">Vendor Portal</option>
            <option value="Qualifier" className="bg-slate-900">Qualifier Portal</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none">
          <SidebarGroup allowedRoles={[...INTERNAL_ROLES, 'Client', 'Vendor']}>
            <SidebarItem 
              icon={<ClipboardList className="w-4 h-4" />} 
              label="Work orders" 
              href="/?view=work-orders" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "work-orders"}
              allowedRoles={[...INTERNAL_ROLES, 'Client', 'Vendor']}
            />
            <SidebarItem 
              icon={<Users className="w-4 h-4" />} 
              label="Active placements" 
              href="/?view=active-placements" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "active-placements"}
              allowedRoles={[...INTERNAL_ROLES, 'Client', 'Vendor']}
            />
          </SidebarGroup>

          <SidebarGroup title="NETWORK" allowedRoles={[...INTERNAL_ROLES, 'Client', 'Qualifier']}>
            <SidebarItem 
              icon={<BookOpen className="w-4 h-4" />} 
              label="Library" 
              href="/library" 
              isActive={location.pathname === "/library"}
              allowedRoles={[...INTERNAL_ROLES, 'Client', 'Qualifier', 'Vendor']}
            />
            <SidebarItem 
              icon={<ClipboardList className="w-4 h-4" />} 
              label="Onboarding" 
              href="/onboarding" 
              isActive={location.pathname === "/onboarding"}
              allowedRoles={[...INTERNAL_ROLES, 'Client', 'Qualifier']}
            />
            <SidebarItem 
              icon={<UserSquare2 className="w-4 h-4" />} 
              label="Qualifier network" 
              href="/" 
              isActive={location.pathname === "/" && !new URLSearchParams(location.search).get("view")}
              allowedRoles={[...INTERNAL_ROLES, 'Client', 'Qualifier']}
            />
            <SidebarItem 
              icon={<ShieldCheck className="w-4 h-4" />} 
              label="License verifications" 
              href="/?view=verifications" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "verifications"}
              allowedRoles={[...INTERNAL_ROLES, 'Client']}
            />
            <SidebarItem 
              icon={<FileText className="w-4 h-4" />} 
              label="Licenses" 
              href="/licenses" 
              allowedRoles={[...INTERNAL_ROLES, 'Client']}
            />
            <SidebarItem 
              icon={<Handshake className="w-4 h-4" />} 
              label="Affiliate handoffs" 
              href="/?view=handoffs" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "handoffs"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
            <SidebarItem 
              icon={<UsersRound className="w-4 h-4" />} 
              label="Affiliate partners" 
              href="/?view=partners" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "partners"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
          </SidebarGroup>

          <SidebarGroup title="COMPLIANCE & REPORTS" allowedRoles={[...INTERNAL_ROLES, 'Client', 'Vendor']}>
            <SidebarItem 
              icon={<Map className="w-4 h-4" />} 
              label="Reciprocity Map" 
              href="/?view=map" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "map"}
              allowedRoles={[...INTERNAL_ROLES, 'Vendor']}
            />
            <SidebarItem 
              icon={<FileWarning className="w-4 h-4" />} 
              label="State Audits" 
              href="/reports" 
              isActive={location.pathname === "/reports"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
            <SidebarItem 
              icon={<AlertTriangle className="w-4 h-4" />} 
              label="Deficiencies" 
              href="/?view=deficiencies" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "deficiencies"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
          </SidebarGroup>

          <SidebarGroup title="MONEY" allowedRoles={[...INTERNAL_ROLES, 'Client']}>
            <SidebarItem 
              icon={<Receipt className="w-4 h-4" />} 
              label="Invoices" 
              href="/?view=invoices" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "invoices"}
              allowedRoles={[...INTERNAL_ROLES, 'Client']}
            />
            <SidebarItem 
              icon={<RotateCcw className="w-4 h-4" />} 
              label="Deal refunds" 
              href="/refunds" 
              allowedRoles={[...INTERNAL_ROLES]}
            />
            <SidebarItem 
              icon={<RefreshCw className="w-4 h-4" />} 
              label="Renewals" 
              href="/renewals" 
              allowedRoles={[...INTERNAL_ROLES, 'Client']}
            />
            <SidebarItem 
              icon={<Landmark className="w-4 h-4" />} 
              label="Finance" 
              href="/?view=finance" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "finance"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
            <SidebarItem 
              icon={<Receipt className="w-4 h-4" />} 
              label="3rd Party Invoicing" 
              href="/invoicing" 
              isActive={location.pathname === "/invoicing"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
          </SidebarGroup>

          <SidebarGroup title="RETENTION" allowedRoles={[...INTERNAL_ROLES]}>
            <SidebarItem 
              icon={<ShieldCheck className="w-4 h-4" />} 
              label="Retention Portal" 
              href="/retention" 
              isActive={location.pathname === "/retention"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
          </SidebarGroup>

          <SidebarGroup title="PEOPLE" allowedRoles={[...INTERNAL_ROLES]}>
            <SidebarItem 
              icon={<Users className="w-4 h-4" />} 
              label="Clients CRM" 
              href="/?view=clients-crm" 
              isActive={location.pathname === "/" && new URLSearchParams(location.search).get("view") === "clients-crm"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
            <SidebarItem 
              icon={<UsersRound className="w-4 h-4" />} 
              label="Role Management" 
              href="/roles" 
              isActive={location.pathname === "/roles"}
              allowedRoles={[...INTERNAL_ROLES]}
            />
          </SidebarGroup>

          <SidebarGroup title="SYSTEM">
            <SidebarItem 
              icon={<SettingsIcon className="w-4 h-4" />} 
              label="System Settings" 
              href="/settings" 
              isActive={location.pathname === "/settings"}
            />
            <SidebarItem 
              icon={<Download className="w-4 h-4" />} 
              label="Export Code" 
              href="/export" 
              isActive={location.pathname === "/export"}
            />
          </SidebarGroup>
        </div>

        <div className="p-4 border-t border-white/10 space-y-4">
          <a href="#" className="flex items-center gap-2 text-sm text-[hsl(var(--sidebar-fg))] hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
            Preview marketing site →
          </a>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </div>
              Preview: New License
            </div>
            <div className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/50">OFF</div>
          </div>

          <Link to="/profile" className="flex items-center gap-2 text-sm text-[hsl(var(--sidebar-fg))] hover:text-white transition-colors w-full pt-2">
            <User className="w-4 h-4" />
            My Profile
          </Link>

          <Link to="/login" onClick={() => logout()} className="flex items-center gap-2 text-sm text-[hsl(var(--sidebar-fg))] hover:text-red-400 transition-colors w-full pt-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Nav Bar */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0">
          <div className="font-medium text-lg text-slate-800">
            {location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <span className="font-semibold">Notifications</span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">1 New</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 bg-primary rounded-full shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">License Approved</p>
                        <p className="text-xs text-slate-500 mt-0.5">Your electrical license for TX has been approved.</p>
                        <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-start gap-3 opacity-60">
                      <div className="w-2 h-2 mt-1.5 bg-transparent rounded-full shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">New Work Order</p>
                        <p className="text-xs text-slate-500 mt-0.5">A new placement work order was assigned to you.</p>
                        <p className="text-xs text-slate-400 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t text-center">
                  <button className="text-sm text-primary hover:underline">Mark all as read</button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {role.charAt(0)}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
