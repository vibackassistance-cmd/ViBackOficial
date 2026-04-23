import { Heart, Shield, Truck, Star } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-3">Sobre ViBack</h1>
          <p className="text-lg text-muted-foreground">
            Tu tienda de confianza para sets de bloques de construcción
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6">Nuestra historia</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            En ViBack nos apasionan los sets de bloques de construcción y todo lo que representan: creatividad, entretenimiento y la posibilidad de construir algo único pieza a pieza. Nuestra misión es acercar a más personas a este mundo, ofreciendo una selección de sets cuidadosamente elegidos para diferentes edades, gustos y niveles de dificultad.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Trabajamos para que encontrar el set perfecto sea sencillo y rápido. A través de nuestro catálogo puedes explorar distintas colecciones y descubrir nuevas construcciones, y si alguno te interesa, puedes contactarnos directamente para ayudarte con tu pedido.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            En ViBack creemos que construir no es solo un hobby, sino una experiencia que despierta la imaginación y convierte cada proyecto en algo especial.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-card w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Confianza</h3>
              <p className="text-sm text-muted-foreground">
                Trabajamos para ofrecer una experiencia transparente y segura en cada pedido.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-card w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Pasión</h3>
              <p className="text-sm text-muted-foreground">
                Amamos los bloques de construcción tanto como tú
              </p>
            </div>
            <div className="text-center">
              <div className="bg-card w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Servicio</h3>
              <p className="text-sm text-muted-foreground">
                Atención personalizada y entregas confiables
              </p>
            </div>
            <div className="text-center">
              <div className="bg-card w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Calidad</h3>
              <p className="text-sm text-muted-foreground">
                Sets en perfecto estado, cuidadosamente seleccionados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Nuestra misión</h2>
          <p className="text-lg text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
            Hacer que la magia de los bloques de construcción sea accesible para todos, ofreciendo una experiencia
            de compra simple, rápida y confiable. Creemos que cada set cuenta una
            historia, y queremos ayudarte a encontrar la tuya.
          </p>
        </div>
      </section>
    </div>
  );
}