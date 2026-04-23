import { useParams } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products, getCategoryProducts } from '../data/products';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

export function Catalog() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [showBrands, setShowBrands] = useState(false);

  // Obtener productos base según categoría
  const baseProducts = category ? getCategoryProducts(category) : products;

  // Extraer marcas únicas de los productos
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(product => {
      // Extraer la marca del nombre del producto (primera palabra o primeras palabras)
      const name = product.name;
      // Lista de marcas conocidas
      if (name.includes('Nikhe') || name.includes('nikhe')) brandSet.add('Nikhe');
      if (name.includes('Adidas')) brandSet.add('Adidas');
      if (name.includes('New B')) brandSet.add('New B');
      if (name.includes('Yizzy') || name.includes('Yzzy')) brandSet.add('Yizzy/Yzzy');
      if (name.includes('Dioré')) brandSet.add('Dioré');
      if (name.includes('Bappesta')) brandSet.add('Bappesta');
      if (name.includes('Louis V')) brandSet.add('Louis V');
      if (name.includes('Ralph L')) brandSet.add('Ralph L');
      if (name.includes('Amoro')) brandSet.add('Amoro');
      if (name.includes('Ghoyyardd')) brandSet.add('Ghoyyardd');
      if (name.includes('Prxda')) brandSet.add('Prxda');
      if (name.includes('Alexander McQu33n')) brandSet.add('Alexander McQu33n');
      if (name.includes('H0ka')) brandSet.add('H0ka');
      if (name.includes('0n Running')) brandSet.add('0n Running');
      if (name.includes('Ashics')) brandSet.add('Ashics');
      if (name.includes('Ray Visión')) brandSet.add('Ray Visión');
      if (name.includes('Ccoach')) brandSet.add('Ccoach');
      if (name.includes('Trav1s Scott')) brandSet.add('Trav1s Scott');
      if (name.includes('Jhordan')) brandSet.add('Jhordan');
      if (name.includes('Airr Maxx')) brandSet.add('Airr Maxx');
      if (name.includes('Airp0ds')) brandSet.add('Airp0ds');
      if (name.includes('Appl3')) brandSet.add('Appl3');
      if (name.includes('Balenc1aga')) brandSet.add('Balenc1aga');
    });
    return Array.from(brandSet).sort();
  }, []);

  // Filtrar y ordenar productos
  const displayProducts = useMemo(() => {
    let filtered = [...baseProducts];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por marca
    if (selectedBrand) {
      filtered = filtered.filter(product =>
        product.name.includes(selectedBrand)
      );
    }

    // Ordenar por precio
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [baseProducts, searchTerm, selectedBrand, sortOrder]);
  
  const getCategoryTitle = () => {
    if (category === 'star-wars') return 'Star Wars';
    if (category === 'cars') return 'Cars';
    if (category === 'ropa') return 'Ropa';
    if (category === 'accesorios') return 'Accesorios';
    if (category === 'bambas') return 'Bambas';
    if (category === 'verano') return 'Verano';
    if (category === 'relojes') return 'Relojes';
    if (category === 'electronica') return 'Electrónica';
    if (category === 'equipaciones') return 'Equipaciones';
    if (category === 'bestsellers') return 'Más vendidos';
    return 'Todos los productos';
  };

  const getCategoryDescription = () => {
    if (category === 'star-wars') return 'Sets de bloques de construcción del universo Star Wars';
    if (category === 'cars') return 'Sets de bloques de vehículos deportivos y modelos de carreras';
    if (category === 'ropa') return 'Camisetas, polos y más prendas de calidad';
    if (category === 'accesorios') return 'Gafas, carteras, cinturones y gorras premium';
    if (category === 'bambas') return 'Zapatillas deportivas de marcas premium';
    if (category === 'verano') return 'Bañadores de marcas premium para la temporada de verano';
    if (category === 'relojes') return 'Relojes de lujo de marcas premium';
    if (category === 'electronica') return 'Auriculares, smartwatches y accesorios tecnológicos';
    if (category === 'equipaciones') return 'Equipaciones de fútbol oficiales y exclusivas';
    if (category === 'bestsellers') return 'Los productos favoritos de nuestros clientes';
    return 'Explora nuestra colección completa de productos';
  };

  // Productos organizados por categoría (solo para vista general)
  const clothingProducts = displayProducts.filter(p => p.category === 'ropa');
  const accessoriesProducts = displayProducts.filter(p => p.category === 'accesorios');
  const bambasProducts = displayProducts.filter(p => p.category === 'bambas');
  const veranoProducts = displayProducts.filter(p => p.category === 'verano');
  const relojesProducts = displayProducts.filter(p => p.category === 'relojes');
  const electronicaProducts = displayProducts.filter(p => p.category === 'electronica');
  const equipacionesProducts = displayProducts.filter(p => p.category === 'equipaciones');
  const starWarsProducts = displayProducts.filter(p => p.category === 'star-wars');
  const carsProducts = displayProducts.filter(p => p.category === 'cars');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-3">{getCategoryTitle()}</h1>
          <p className="text-lg text-muted-foreground">{getCategoryDescription()}</p>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="bg-background border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Buscador */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowBrands(true)}
                className="w-full pl-10 pr-10 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* Dropdown de marcas */}
              {showBrands && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto z-30">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
                      Filtrar por marca
                    </div>
                    <button
                      onClick={() => {
                        setSelectedBrand('');
                        setShowBrands(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded hover:bg-secondary transition-colors ${
                        !selectedBrand ? 'bg-secondary font-medium' : ''
                      }`}
                    >
                      Todas las marcas
                    </button>
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setSelectedBrand(brand);
                          setShowBrands(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-secondary transition-colors ${
                          selectedBrand === brand ? 'bg-secondary font-medium' : ''
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filtro de marca seleccionado */}
            {selectedBrand && (
              <div className="flex items-center gap-2 bg-[#18A2D9] text-white px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">{selectedBrand}</span>
                <button
                  onClick={() => setSelectedBrand('')}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Ordenar por precio */}
            <div className="w-full md:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
              >
                <option value="none">Ordenar por</option>
                <option value="asc">Precio: Menor a Mayor</option>
                <option value="desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Cerrar dropdown al hacer clic fuera */}
          {showBrands && (
            <div
              className="fixed inset-0 z-20"
              onClick={() => setShowBrands(false)}
            />
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        {category ? (
          // Vista de categoría específica
          displayProducts.length > 0 ? (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                Mostrando {displayProducts.length} {displayProducts.length === 1 ? 'producto' : 'productos'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                {searchTerm || selectedBrand
                  ? 'No se encontraron productos con los filtros seleccionados.'
                  : 'No hay productos disponibles en esta categoría.'}
              </p>
              {(searchTerm || selectedBrand) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBrand('');
                    setSortOrder('none');
                  }}
                  className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )
        ) : (
          // Vista general con todas las categorías organizadas
          displayProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No se encontraron productos con los filtros seleccionados.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBrand('');
                  setSortOrder('none');
                }}
                className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
          <div className="space-y-16">
            {/* Contador de productos */}
            <div className="text-sm text-muted-foreground">
              Mostrando {displayProducts.length} {displayProducts.length === 1 ? 'producto' : 'productos'}
            </div>
            {/* Ropa */}
            {clothingProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Ropa</h2>
                  <p className="text-muted-foreground">Camisetas, polos y más prendas de calidad</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {clothingProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Accesorios */}
            {accessoriesProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Accesorios</h2>
                  <p className="text-muted-foreground">Gafas, carteras, cinturones y gorras premium</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {accessoriesProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Bambas */}
            {bambasProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Bambas</h2>
                  <p className="text-muted-foreground">Zapatillas deportivas de marcas premium</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {bambasProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Verano */}
            {veranoProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Verano</h2>
                  <p className="text-muted-foreground">Bañadores de marcas premium para la temporada de verano</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {veranoProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Relojes */}
            {relojesProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Relojes</h2>
                  <p className="text-muted-foreground">Relojes de lujo de marcas premium</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {relojesProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {electronicaProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Electrónica</h2>
                  <p className="text-muted-foreground">Auriculares, smartwatches y accesorios tecnológicos</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {electronicaProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {equipacionesProducts.length > 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Equipaciones</h2>
                  <p className="text-muted-foreground">Equipaciones de fútbol oficiales y exclusivas</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {equipacionesProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Bloques de construcción */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Bloques de construcción</h2>
                <p className="text-muted-foreground">Sets de bloques de construcción Star Wars, Cars y más</p>
              </div>
              
              {/* Star Wars */}
              {starWarsProducts.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-[#18A2D9]">Star Wars</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {starWarsProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* Cars */}
              {carsProducts.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#18A2D9]">Cars</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {carsProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          )
        )}
      </section>
    </div>
  );
}