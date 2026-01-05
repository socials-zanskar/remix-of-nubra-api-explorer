import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
  { label: "API Docs", href: "https://nubra.io/products/api/docs/", isExternal: true },
];

export const NavBar = () => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  
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

  const isActive = (item: NavItem) => {
    if (item.isExternal) return false;
    return location.pathname === item.href;
  };

  const navigate = useNavigate();

  const handleIntegrateClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('integrate-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('integrate-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4">
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
              {item.hasIcon && <img src={nubraLogo} alt="" className="w-4 h-4" />}
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
    </nav>
  );
};
