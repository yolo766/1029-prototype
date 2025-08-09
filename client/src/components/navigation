import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/prediction", label: "Prediction" },
    { path: "/future-risks", label: "Future Risks" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-white/20" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">AquaSmart</h1>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white/50 transition-all duration-200"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" data-testid="mobile-menu">
          <div className="px-4 py-3 space-y-2 bg-white/10 backdrop-blur-md border-t border-white/20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-blue-600 bg-white/30"
                    : "text-gray-500 hover:text-blue-600 hover:bg-white/30"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
