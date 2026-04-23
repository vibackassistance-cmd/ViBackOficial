import { MessageCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import type { Product } from '../data/products';
import { useEstimation } from '../context/EstimationContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useEstimation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hola! Me interesa el set ${product.name} (${product.setNumber})`;
    const url = `https://wa.me/34711240544?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAddToEstimation = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    navigate('/estimacion');
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Link to={`/producto/${product.id}`} className="group">
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square overflow-hidden bg-secondary relative">
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Navigation arrows - only show if more than 1 image */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/80 hover:bg-foreground text-background rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/80 hover:bg-foreground text-background rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100 z-10"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-2 right-2 bg-foreground/80 text-background px-2 py-0.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          {product.setNumber && (
            <div className="text-xs text-muted-foreground mb-1">Set {product.setNumber}</div>
          )}
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{product.price}€</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.originalPrice}€</span>
              )}
            </div>
            {product.shippingIncluded && (
              <div className="text-xs text-green-600 mt-1">✓ Envío incluido</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            {product.sizes ? (
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                Tallas: {product.sizes.join(', ')}
              </span>
            ) : product.age ? (
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">
                {product.age}
              </span>
            ) : (
              <span className="text-xs"></span>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleAddToEstimation}
                className="bg-[#18A2D9] text-white hover:bg-[#18A2D9]/90 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 shadow"
                title="Agregar a estimación"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BA5A] px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow"
              >
                <MessageCircle className="h-4 w-4" />
                Pedir
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}