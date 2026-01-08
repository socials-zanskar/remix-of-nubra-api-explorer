import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import activePill from "@/assets/active-pill.png";
import nubraLogo from "@/assets/nubra-logo.png";

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
  { label: "API Docs", href: "/products/api/docs/", isExternal: true },
  { label: "Pricing", href: "https://nubra.io/pricing", isExternal: true },
];

export const NavBar = () => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const itemWidth = 120;
  const gap = 4;
  const padding = 6;

  const getActiveIndex = () => {
    const index = navItems.findIndex((item) => {
      if (item.isExternal) return false;
      return location.pathname === item.href;
    });
    return index >= 0 ? index : 0;
  };

  const calculateLeft = (index: number) => padding + index * (itemWidth + gap);

  const [indicatorLeft, setIndicatorLeft] = useState(() => calculateLeft(getActiveIndex()));

  useEffect(() => {
    const activeIndex = getActiveIndex();
    setIndicatorLeft(calculateLeft(activeIndex));
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (item: NavItem) => {
    if (item.isExternal) return false;
    return location.pathname === item.href;
  };

  const navigate = useNavigate();

  const handleIntegrateClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('integrate')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('integrate')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {/* Pill container */}
        <div 
          ref={navRef}
          className="relative flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
        >
          {/* Sliding glow indicator */}
          <img
            src={activePill}
            alt=""
            className="absolute top-1.5 bottom-1.5 h-[calc(100%-12px)] transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: indicatorLeft,
              width: itemWidth,
            }}
          />

          {navItems.map((item) => {
            const active = isActive(item);
            
            const baseClass = `
              relative z-10 flex items-center justify-center gap-2 w-[120px] py-2 rounded-full text-sm font-medium transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
            `;
            
            const colorClass = active
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground";

            const className = `${baseClass} ${colorClass}`;

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
              {item.hasIcon && <img src={nubraLogo} alt="" className="w-[18px] h-[12px]" />}
              {item.label}
            </Link>
            );
          })}
        </div>

        {/* Integrate with Nubra button */}
        <Button 
          onClick={handleIntegrateClick}
          className="rounded-full px-6 py-2 text-sm font-medium"
        >
          Integrate with Nubra
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20">
        <Link to="/" className="flex items-center gap-2">
          <img src={nubraLogo} alt="Nubra" className="w-[18px] h-[12px]" />
          <span className="text-sm font-medium text-foreground">Nubra API</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-foreground"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden">
          <div className="flex flex-col p-2">
            {navItems.slice(1).map((item) => {
              const active = isActive(item);

              if (item.isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    active 
                      ? "text-primary bg-white/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button 
              onClick={handleIntegrateClick}
              className="mt-2 rounded-full px-6 py-2 text-sm font-medium"
            >
              Integrate with Nubra
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
