import { useState } from 'react';
import { useEstimation } from '../context/EstimationContext';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, ShoppingCart, Package, MapPin, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export function Estimation() {
  const { items, updateQuantity, removeItem, clearItems } = useEstimation();
  const [selectedCountry, setSelectedCountry] = useState('');

  // Obtener lista única de países de todos los productos
  const getAvailableCountries = () => {
    if (items.length === 0) return [];
    // Buscar productos que necesiten envío calculado
    const productsNeedingShipping = items.filter(item => !item.product.shippingIncluded);
    if (productsNeedingShipping.length === 0) return []; // No countries needed if all have shipping included
    // Usar los países del primer producto que necesita envío
    return productsNeedingShipping[0].product.shippingCosts?.map(sc => sc.country).sort() || [];
  };

  const availableCountries = getAvailableCountries();

  // Convertir precio string a número (ej: "45,23 €" -> 45.23)
  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace('€', '').replace(',', '.').trim());
  };

  // Calcular subtotal de productos
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  // Calcular costo de envío por producto
  const calculateShippingPerProduct = (item: typeof items[0]) => {
    // Si el producto tiene envío incluido, devolver 0
    if (item.product.shippingIncluded) return 0;
    if (!selectedCountry) return 0;
    if (!item.product.shippingCosts) return 0;
    const shippingCost = item.product.shippingCosts.find(
      sc => sc.country === selectedCountry
    );
    return shippingCost ? parsePrice(shippingCost.price) * item.quantity : 0;
  };

  // Calcular costo total de envío
  const calculateTotalShipping = () => {
    if (!selectedCountry) return 0;
    return items.reduce((total, item) => total + calculateShippingPerProduct(item), 0);
  };

  // Calcular total final
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalShipping();
  };

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\\n\\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}`;
      if (item.product.setNumber) {
        message += ` (${item.product.setNumber})`;
      }
      if (item.selectedSize) {
        message += ` - Talla: ${item.selectedSize}`;
      }
      message += '\\n';
      message += `   Cantidad: ${item.quantity}\\n`;
      message += `   Precio unitario: €${item.product.price.toFixed(2)}\\n`;
      message += `   Subtotal: €${(item.product.price * item.quantity).toFixed(2)}\\n`;
      if (selectedCountry && !item.product.shippingIncluded) {
        message += `   Envío: €${calculateShippingPerProduct(item).toFixed(2)}\\n`;
      }
      message += '\\n';
    });

    message += `Subtotal productos: €${calculateSubtotal().toFixed(2)}\\n`;
    if (selectedCountry) {
      const totalShipping = calculateTotalShipping();
      if (totalShipping > 0) {
        message += `Envío total a ${selectedCountry}: €${totalShipping.toFixed(2)}\\n`;
      }
      message += `TOTAL: €${calculateTotal().toFixed(2)}`;
    } else {
      message += `TOTAL: €${calculateSubtotal().toFixed(2)}`;
    }

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/34123456789?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <ShoppingCart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="mb-4">Tu estimación está vacía</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Agrega productos desde el catálogo para calcular el costo de tu pedido
              </p>
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#18A2D9] hover:bg-[#18A2D9]/90 text-white rounded-lg transition-colors"
              >
                Ver Catálogo
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="mb-4 text-center">Estimación de Pedido</h1>
            <p className="text-lg text-muted-foreground text-center">
              Calcula el costo total de tu pedido incluyendo envío internacional
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#18A2D9]" />
                  <h2 className="text-xl">Productos Seleccionados</h2>
                </div>
                <button
                  onClick={clearItems}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Limpiar todo
                </button>
              </motion.div>

              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Imagen del producto */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Detalles del producto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {item.product.name}
                          </h3>
                          {item.product.setNumber && (
                            <p className="text-sm text-muted-foreground">
                              Set {item.product.setNumber}
                            </p>
                          )}
                          {item.selectedSize && (
                            <p className="text-sm text-muted-foreground">
                              Talla: {item.selectedSize}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                            className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                            className="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-secondary transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Precio */}
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            €{item.product.price} × {item.quantity}
                          </div>
                          <div className="font-semibold text-lg text-[#18A2D9]">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Costo de envío por producto */}
                      {item.product.shippingIncluded ? (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600">
                              ✓ Envío incluido en el precio
                            </span>
                          </div>
                        </div>
                      ) : selectedCountry ? (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Envío ({item.quantity} unidad{item.quantity > 1 ? 'es' : ''})
                            </span>
                            <span className="font-medium">
                              €{calculateShippingPerProduct(item).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Panel de resumen y cálculo */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6"
              >
                {/* Selector de país */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-[#F2A20C]" />
                    <h3 className="font-semibold">País de Envío</h3>
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-[#18A2D9] transition-shadow"
                  >
                    <option value="">Selecciona un país</option>
                    {availableCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resumen de costos */}
                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-[#18A2D9]" />
                    <h3 className="font-semibold">Resumen</h3>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal productos</span>
                    <span className="font-medium">€{calculateSubtotal().toFixed(2)}</span>
                  </div>

                  {selectedCountry && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envío a {selectedCountry}</span>
                        <span className="font-medium">€{calculateTotalShipping().toFixed(2)}</span>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <div className="flex justify-between items-baseline">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-[#18A2D9]">
                            €{calculateTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {!selectedCountry && (
                    <div className="text-sm text-muted-foreground text-center py-4 bg-secondary/50 rounded-lg">
                      Selecciona un país para calcular el envío
                    </div>
                  )}
                </div>

                {/* Botón de WhatsApp */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full px-6 py-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar Pedido por WhatsApp
                </button>

                <div className="text-xs text-muted-foreground text-center">
                  Al hacer clic, se abrirá WhatsApp con tu pedido listo para enviar
                </div>
              </motion.div>
            </div>
          </div>

          {/* Botón para continuar comprando */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-[#18A2D9] hover:text-[#18A2D9]/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar más productos
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}