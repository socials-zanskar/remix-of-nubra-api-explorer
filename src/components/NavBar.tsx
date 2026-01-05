import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  hasIcon?: boolean;
}

const navItems: NavItem[] = [
  { label: "Nubra API", href: "/", hasIcon: true },
  { label: "Webinars", href: "/webinars" },
  { label: "Blogs", href: "/blogs" },
  { label: "API Docs", href: "https://nubra.io/products/api/docs/", isExternal: true },
];

export const NavBar = () => {
  const location = useLocation();

  const isActive = (item: NavItem) => {
    if (item.isExternal) return false;
    return location.pathname === item.href;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      {/* Pill container */}
      <div className="relative flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden">
        {/* Inner glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-primary/20 blur-md" />
        {navItems.map((item) => {
          const active = isActive(item);
          
          const baseClass = `
            relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
          `;
          
          const activeClass = active
            ? "bg-primary/20 text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-white/5";

          const className = `${baseClass} ${activeClass}`;

          // External links
          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {item.label}
              </a>
            );
          }

          // React Router links for routes
          return (
            <Link
              key={item.label}
              to={item.href}
              className={className}
            >
              {item.hasIcon && <Zap className="w-4 h-4" />}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
