import { Link } from 'react-router';
import { MessageCircle, Blocks, Search, Send, Star, Calculator } from 'lucide-react';
import { products } from '../data/products';

export function Home() {

  // Obtener una imagen representativa de cada categoría
  const categories = [
    {
      name: 'Ropa',
      slug: 'ropa',
      description: 'Camisetas, polos y más prendas de calidad',
      image: products.find(p => p.category === 'ropa')?.image || '',
    },
    {
      name: 'Accesorios',
      slug: 'accesorios',
      description: 'Gafas, carteras, cinturones y gorras premium',
      image: products.find(p => p.category === 'accesorios')?.image || '',
    },
    {
      name: 'Bambas',
      slug: 'bambas',
      description: 'Zapatillas deportivas de marcas premium',
      image: products.find(p => p.category === 'bambas')?.image || '',
    },
    {
      name: 'Verano',
      slug: 'verano',
      description: 'Bañadores de marcas premium',
      image: products.find(p => p.category === 'verano')?.image || '',
    },
    {
      name: 'Equipaciones',
      slug: 'equipaciones',
      description: 'Equipaciones de fútbol oficiales y exclusivas',
      image: products.find(p => p.category === 'equipaciones')?.image || '',
    },
    {
      name: 'Electrónica',
      slug: 'electronica',
      description: 'Auriculares, smartwatches y accesorios tecnológicos',
      image: products.find(p => p.category === 'electronica')?.image || '',
    },
    {
      name: 'Star Wars',
      slug: 'star-wars',
      description: 'Sets de bloques de construcción Star Wars',
      image: products.find(p => p.category === 'star-wars')?.image || '',
    },
    {
      name: 'Cars',
      slug: 'cars',
      description: 'Sets de bloques de vehículos deportivos',
      image: products.find(p => p.category === 'cars')?.image || '',
    },
    {
      name: 'Relojes',
      slug: 'relojes',
      description: 'Relojes de lujo de marcas premium',
      image: products.find(p => p.category === 'relojes')?.image || '',
    },
  ];

  const reviews = [
    {
      name: 'Belendboy',
      rating: 5,
      text: '10/10 quality defo buying again',
      image: 'https://i.postimg.cc/zBBzz3n8/IMG-1166.jpg'
    },
    {
      name: 'Moudy',
      rating: 5,
      text: 'Order came thru 10/10',
      image: 'https://i.postimg.cc/Z5xv0ByX/IMG-1166.jpg'
    },
    {
      name: 'm3pzay',
      rating: 5,
      text: 'finished this master piece! No issues at all amazing amazing quality',
      image: 'https://i.postimg.cc/CxSzyh6d/IMG-1166.jpg'
    },
    {
      name: 'Davis',
      rating: 5,
      text: 'Top quality 🙌🙌',
      image: 'https://i.postimg.cc/jdQShVdf/IMG-1166.jpg'
    },
    {
      name: 'WM_ckenna',
      rating: 5,
      text: 'Had slight problems with shipping but as a first time buyer once the right parcel arrived I now know he\'s a very reliable honest and trustworthy supplier 100% gonna buy again👍🏼',
      image: 'https://i.postimg.cc/SRGbchLV/IMG-1166.jpg'
    },
    {
      name: 'thewolfofafghanistan',
      rating: 5,
      text: 'Big order arrived a while ago, only just opened it but I\'m pleased to say the quality is amazing. Especially of the new and improved sets and the ones with the logos on. Only downside is a bit of damage to a couple of them but this is expected with the long distance shipping, will definitely be ordering more soon',
      image: 'https://i.postimg.cc/j5r1c1jJ/IMG-1166.jpg'
    }
  ];

  const handleHeroWhatsApp = () => {
    const message = 'Hola! Quiero hacer un pedido.';
    const url = `https://wa.me/34711240544?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Tu tienda de moda y bloques de construcción
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre nuestra selección de ropa, accesorios, bambas, bañadores premium y los mejores sets de bloques de construcción.
            Haz tu pedido fácilmente por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleHeroWhatsApp}
              className="bg-[#25D366] text-white hover:bg-[#20BA5A] px-8 py-4 rounded-lg inline-flex items-center gap-2 text-lg transition-colors shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Pedir por WhatsApp
            </button>
            <Link
              to="/catalogo"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 rounded-lg inline-flex items-center gap-2 text-lg transition-colors shadow-lg"
            >
              <Search className="h-5 w-5" />
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Categorías populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/catalogo/${category.slug}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-secondary relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#18A2D9] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Reseñas de nuestros clientes (Más de 50 clientes satisfechos)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 flex flex-col">
              {/* Header with name and stars */}
              <div className="mb-3">
                <h3 className="font-semibold text-lg mb-2">{review.name}</h3>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              {/* Review text */}
              <p className="text-muted-foreground text-sm mb-4 flex-grow">{review.text}</p>
              
              {/* Review image */}
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={review.image} 
                  alt={`Reseña de ${review.name}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/catalogo/ropa"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">👕</div>
              <h3 className="text-xl font-semibold mb-2">Ropa</h3>
              <p className="text-muted-foreground text-sm">
                Camisetas, polos y más
              </p>
            </Link>
            <Link
              to="/catalogo/accesorios"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🕶️</div>
              <h3 className="text-xl font-semibold mb-2">Accesorios</h3>
              <p className="text-muted-foreground text-sm">
                Gafas, carteras, cinturones y gorras
              </p>
            </Link>
            <Link
              to="/catalogo/bambas"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">👟</div>
              <h3 className="text-xl font-semibold mb-2">Bambas</h3>
              <p className="text-muted-foreground text-sm">
                Zapatillas deportivas de marcas premium
              </p>
            </Link>
            <Link
              to="/catalogo/verano"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold mb-2">Verano</h3>
              <p className="text-muted-foreground text-sm">
                Bañadores de marcas premium
              </p>
            </Link>
            <Link
              to="/catalogo/star-wars"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Star Wars</h3>
              <p className="text-muted-foreground text-sm">
                Sets de bloques de construcción Star Wars
              </p>
            </Link>
            <Link
              to="/catalogo/cars"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">🏎️</div>
              <h3 className="text-xl font-semibold mb-2">Cars</h3>
              <p className="text-muted-foreground text-sm">
                Sets de bloques de vehículos deportivos
              </p>
            </Link>
            <Link
              to="/catalogo/relojes"
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">⌚</div>
              <h3 className="text-xl font-semibold mb-2">Relojes</h3>
              <p className="text-muted-foreground text-sm">
                Relojes de lujo de marcas premium
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Estimation CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#18A2D9]/10 to-[#F2A20C]/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border border-[#18A2D9]/20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#18A2D9] rounded-full mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Calcula el costo de tu pedido</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Usa nuestra herramienta de estimación para calcular el precio total de tu pedido incluyendo el envío internacional a tu país
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/estimacion"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#18A2D9] hover:bg-[#18A2D9]/90 text-white rounded-lg transition-colors font-semibold shadow-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Hacer una Estimación
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center px-8 py-4 bg-background hover:bg-secondary border-2 border-[#18A2D9] text-foreground rounded-lg transition-colors font-semibold"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Cómo comprar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Explora el catálogo</h3>
            <p className="text-muted-foreground">
              Navega por nuestras categorías y encuentra el set perfecto para ti
            </p>
          </div>
          <div className="text-center">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Blocks className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Elige tu set</h3>
            <p className="text-muted-foreground">
              Selecciona el set que más te guste de nuestra colección
            </p>
          </div>
          <div className="text-center">
            <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Escríbenos por WhatsApp</h3>
            <p className="text-muted-foreground">
              Contacta con nosotros para realizar tu pedido de forma rápida y fácil
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}