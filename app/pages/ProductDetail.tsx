import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Calculator } from 'lucide-react';
import { getProductById } from '../data/products';
import { useState } from 'react';
import { useEstimation } from '../context/EstimationContext';
import { Badge } from '../components/Badge';
import { Breadcrumb, BreadcrumbItem } from '../components/Breadcrumb';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(Number(id));
  const { addItem } = useEstimation();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
          <Link to="/catalogo" className="text-primary hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    let message = `Hola quiero ${product.name}`;
    if (product.setNumber) {
      message += ` (${product.setNumber})`;
    }
    if (selectedSize) {
      message += ` - Talla: ${selectedSize}`;
    }
    if (selectedCountry) {
      message += ` y Soy de ${selectedCountry}`;
    }
    const url = `https://wa.me/34711240544?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAddToEstimation = () => {
    // Si el producto tiene tallas y no se ha seleccionado ninguna, mostrar alerta
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Por favor, selecciona una talla antes de añadir a la estimación');
      return;
    }
    addItem(product, 1, selectedSize);
    navigate('/estimacion');
  };

  // Helper function to generate breadcrumb items
  const getCategoryName = (category: string): string => {
    const categoryNames: Record<string, string> = {
      'star-wars': 'Star Wars',
      'cars': 'Cars',
      'ropa': 'Ropa',
      'accesorios': 'Accesorios',
      'bambas': 'Bambas',
      'verano': 'Verano',
      'relojes': 'Relojes',
      'bestsellers': 'Más Vendidos'
    };
    return categoryNames[category] || category;
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: getCategoryName(product.category), href: `/catalogo/${product.category}` },
    { label: product.name }
  ];

  return (
    <div className="min-h-screen">
      {/* Back Button and Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <Link 
          to="/catalogo"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Product Info */}
      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Image Carousel */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary relative">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation arrows - only show if more than 1 image */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-foreground/80 hover:bg-foreground text-background rounded-full p-2 transition-colors z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-foreground/80 hover:bg-foreground text-background rounded-full p-2 transition-colors z-10"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-6 gap-2 mt-4 max-h-32 overflow-y-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-foreground ring-2 ring-foreground/20' 
                        : 'border-border hover:border-foreground/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              {product.setNumber && (
                <div className="text-sm text-muted-foreground mb-2">Set {product.setNumber}</div>
              )}
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
              
              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.map((badge, index) => (
                    <Badge key={index} text={badge} />
                  ))}
                </div>
              )}
              
              {/* Tallas o edad */}
              {product.sizes && product.sizes.length > 0 ? (
                <div className="mb-4">
                  <div className="inline-block bg-secondary px-4 py-2 rounded-full text-sm font-medium mb-3">
                    Tallas disponibles: {product.sizes.join(', ')}
                  </div>
                  {/* Size Selector */}
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium mb-2">
                      Selecciona tu talla
                    </label>
                    <select
                      id="size"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
                    >
                      <option value="">-- Selecciona una talla --</option>
                      {product.sizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : product.age ? (
                <div className="inline-block bg-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Edad: {product.age}
                </div>
              ) : null}
              
              {/* Price Section */}
              <div className="bg-secondary/50 rounded-lg p-6 mb-6">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Precio del producto</div>
                  <div className="text-3xl font-bold">{product.price}€</div>
                  {product.shippingIncluded && (
                    <div className="text-sm text-green-600 mt-2">✓ Envío incluido en el precio</div>
                  )}
                </div>

                {/* Country Selector - Solo para productos con envío calculado */}
                {!product.shippingIncluded && product.shippingCosts && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        Selecciona tu país para calcular el envío
                      </label>
                      <select
                        id="country"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
                      >
                        <option value="">-- Selecciona un país --</option>
                        {product.shippingCosts.map((cost, index) => (
                          <option key={index} value={cost.country}>
                            {cost.country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Total Price */}
                    {selectedCountry && (
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Producto:</span>
                          <span className="font-medium">{product.price}€</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-muted-foreground">Envío a {selectedCountry}:</span>
                          <span className="font-medium">
                            {product.shippingCosts.find(c => c.country === selectedCountry)?.price}
                          </span>
                        </div>
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Precio total:</span>
                            <span className="text-2xl font-bold">
                              {(() => {
                                const shippingCost = product.shippingCosts.find(c => c.country === selectedCountry);
                                if (shippingCost) {
                                  const shippingPrice = parseFloat(shippingCost.price.replace(',', '.').replace(' €', ''));
                                  return (product.price + shippingPrice).toFixed(2).replace('.', ',');
                                }
                                return product.price;
                              })()}€
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] text-white hover:bg-[#20BA5A] px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Contactar ahora
            </button>

            {/* Add to Estimation Button */}
            <button
              onClick={handleAddToEstimation}
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 mt-4"
            >
              <Calculator className="h-5 w-5" />
              Añadir a estimación
            </button>

            {/* Shipping Costs */}
            {!product.shippingIncluded && product.shippingCosts && (
              <div className="border-t border-border pt-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Información de envío</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  ViBack Standard International Delivery
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                  {product.shippingCosts.map((cost, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center bg-card border rounded-lg px-4 py-3 transition-colors ${
                        selectedCountry === cost.country 
                          ? 'border-foreground bg-foreground/5' 
                          : 'border-border'
                      }`}
                    >
                      <span className="text-sm font-medium">{cost.country}</span>
                      <span className="text-sm text-muted-foreground font-semibold">{cost.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-secondary py-12 px-4 mt-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tienes dudas sobre este producto?</h2>
          <p className="text-muted-foreground mb-6">
            Contáctanos por WhatsApp y te ayudaremos con toda la información que necesites
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Contactar ahora
          </button>
        </div>
      </section>
    </div>
  );
}