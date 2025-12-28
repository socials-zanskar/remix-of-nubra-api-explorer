import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "API Docs", href: "#api-docs" },
  { label: "Webinar", href: "#webinar" },
  { label: "Blogs", href: "#blogs" },
];

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState("API Docs");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`
                  relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  ${
                    activeTab === item.label
                      ? "text-primary-foreground bg-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }
                `}
              >
                {item.label}
                {activeTab === item.label && (
                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-glow-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
