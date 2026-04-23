import { MessageCircle, Mail, Clock } from 'lucide-react';

export function Contact() {
  const handleWhatsAppClick = () => {
    const message = 'Hola! Quiero ponerme en contacto con ViBack.';
    const url = `https://wa.me/34711240544?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:vibackassistance@gmail.com';
  };

  const handleTikTokClick = () => {
    window.open('https://www.tiktok.com/@vibackshop', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-3">Contacto</h1>
          <p className="text-lg text-muted-foreground">
            Estamos aquí para ayudarte. Elige tu medio de contacto preferido
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppClick}
            className="bg-card border-2 border-border hover:border-foreground rounded-lg p-8 text-center transition-all hover:shadow-md group"
          >
            <div className="bg-[#25D366] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">
              La forma más rápida de contactarnos
            </p>
            <span className="text-sm font-medium">Enviar mensaje</span>
          </button>

          {/* Email */}
          <button
            onClick={handleEmailClick}
            className="bg-card border-2 border-border hover:border-foreground rounded-lg p-8 text-center transition-all hover:shadow-md group"
          >
            <div className="bg-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="h-8 w-8 text-background" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Escríbenos a vibackassistance@gmail.com
            </p>
            <span className="text-sm font-medium">Enviar email</span>
          </button>

          {/* TikTok */}
          <button
            onClick={handleTikTokClick}
            className="bg-card border-2 border-border hover:border-foreground rounded-lg p-8 text-center transition-all hover:shadow-md group"
          >
            <div className="bg-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="h-8 w-8 text-background" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">TikTok</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Síguenos en @vibackshop
            </p>
            <span className="text-sm font-medium">Visitar perfil</span>
          </button>
        </div>

        {/* Business Hours */}
        <div className="bg-secondary rounded-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Clock className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Horario de atención</h2>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Lunes a Sábado:</span> 9:00 AM - 22:00 PM
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Domingos:</span> Cerrado
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para hacer tu pedido?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contáctanos ahora por WhatsApp y te ayudaremos a encontrar el set perfecto
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] text-white hover:bg-[#20BA5A] px-8 py-4 rounded-lg inline-flex items-center gap-2 text-lg transition-colors font-semibold shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Contactar por WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}