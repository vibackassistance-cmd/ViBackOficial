import { MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">ViBack</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda de confianza para sets de bloques de construcción. Encuentra los mejores productos y
              haz tu pedido por WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalogo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/como-comprar" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cómo comprar
                </a>
              </li>
              <li>
                <a href="/sobre-viback" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre ViBack
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/34711240544"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="mailto:vibackassistance@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                vibackassistance@gmail.com
              </a>
              <a
                href="https://www.tiktok.com/@vibackshop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ViBack. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}