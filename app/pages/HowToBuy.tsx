import { Search, Blocks, Send, MessageCircle } from 'lucide-react';

export function HowToBuy() {
  const handleWhatsAppClick = () => {
    const message = 'Hola! Tengo dudas sobre cómo comprar.';
    const url = `https://wa.me/34711240544?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-3">Cómo comprar</h1>
          <p className="text-lg text-muted-foreground">
            Realizar tu pedido es muy fácil, solo sigue estos pasos
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              1
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Search className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">Explora el catálogo</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Navega por nuestro catálogo de productos y explora las diferentes categorías
                disponibles: Star Wars, Cars y más vendidos. Encuentra el set que más
                te guste revisando las imágenes, descripciones y números de set.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              2
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Blocks className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">Elige tu set</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Una vez que encuentres el set perfecto, toma nota del nombre y número de set.
                Puedes explorar varios productos antes de decidirte. Todos nuestros sets
                incluyen la edad recomendada para ayudarte a elegir el regalo ideal.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold">
              3
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Send className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">Escríbenos por WhatsApp</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Haz clic en el botón "Pedir por WhatsApp" en la tarjeta del producto que te
                interesa, o usa el botón flotante de WhatsApp en la esquina de la página.
                Te responderemos rápidamente para confirmar disponibilidad, precio y
                coordinar la entrega de tu pedido.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BA5A] px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">¿Cómo puedo comprar un set?</h3>
              <p className="text-muted-foreground">
                Para realizar un pedido solo tienes que elegir el set que te interese en el catálogo y pulsar el botón "Pedir por WhatsApp". Te atenderemos directamente para confirmar disponibilidad y completar tu pedido.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">¿Los productos tienen disponibilidad inmediata?</h3>
              <p className="text-muted-foreground">
                La disponibilidad puede variar. Por eso siempre recomendamos consultar por WhatsApp para confirmar si el set está disponible en ese momento.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">¿Cuánto tarda el envío?</h3>
              <p className="text-muted-foreground">
                El tiempo de entrega puede variar dependiendo del producto y la disponibilidad. Cuando nos contactes por WhatsApp te informaremos del tiempo estimado de entrega.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">¿Cómo se realiza el pago?</h3>
              <p className="text-muted-foreground">
                Las opciones de pago se informan durante la conversación de WhatsApp, una vez confirmemos el pedido y la disponibilidad del set.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">¿Puedo pedir varios sets en el mismo pedido?</h3>
              <p className="text-muted-foreground">
                Sí, puedes pedir varios sets en el mismo pedido. Solo tienes que indicarlo cuando nos escribas.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">¿Puedo hacer una consulta antes de comprar?</h3>
              <p className="text-muted-foreground">
                Claro. Puedes escribirnos por WhatsApp, correo o TikTok si tienes dudas sobre algún set o necesitas ayuda para elegir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}