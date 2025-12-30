import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { label: "Nubra API", href: "/" },
  { label: "Webinars", href: "/webinars" },
  { label: "Blogs", href: "/blogs" },
  { label: "API Docs", href: "https://nubra.io/products/api/docs/", isExternal: true },
  { label: "Integrate with Nubra", href: "#integrate", isButton: true },
];

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: NavItem) => {
    if (item.isButton) return false;
    return location.pathname === item.href;
  };

  const handleIntegrateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        document.getElementById("integrate")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("integrate")?.scrollIntoView({ behavior: "smooth" });
    }
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

              // CTA button with special scroll behavior
              if (item.isButton) {
                return (
                  <button
                    key={item.label}
                    onClick={handleIntegrateClick}
                    className={className}
                  >
                    {item.label}
                  </button>
                );
              }

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

              // Hash links for same-page sections
              if (item.href.startsWith("#")) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
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
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};