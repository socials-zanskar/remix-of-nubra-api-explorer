import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { label: "API Docs", href: "#api-docs" },
  { label: "Webinar", href: "/webinars", isRoute: true },
  { label: "Blogs", href: "#blogs" },
  { label: "Integrate with Nubra", href: "#integrate", isButton: true },
];

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState("API Docs");
  const location = useLocation();

  const isActive = (item: NavItem) => {
    if (item.isRoute) {
      return location.pathname === item.href;
    }
    return activeTab === item.label;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-transparent backdrop-blur-md" />
      
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-center h-14 md:h-16">
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const className = `
                relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                ${
                  item.isButton
                    ? "text-primary-foreground bg-primary/90 hover:bg-primary shadow-md ml-2 md:ml-4"
                    : isActive(item)
                      ? "text-foreground bg-secondary/60"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }
              `;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={className}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => !item.isButton && setActiveTab(item.label)}
                  className={className}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
