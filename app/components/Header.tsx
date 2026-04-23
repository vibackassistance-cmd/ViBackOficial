import { Link, useLocation } from 'react-router';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useEstimation } from '../context/EstimationContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useEstimation();
  const totalItems = getTotalItems();

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/estimacion', label: 'Estimación' },
    { path: '/como-comprar', label: 'Cómo comprar' },
    { path: '/sobre-viback', label: 'Sobre ViBack' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight text-foreground">
              ViBack
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors hover:text-foreground ${
                  isActive(item.path)
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
                {item.path === '/estimacion' && totalItems > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#F2A20C] rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 text-base transition-colors hover:bg-secondary rounded-lg ${
                  isActive(item.path)
                    ? 'text-foreground font-semibold bg-secondary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
                {item.path === '/estimacion' && totalItems > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#F2A20C] rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}