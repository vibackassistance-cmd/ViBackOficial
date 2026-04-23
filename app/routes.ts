import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Estimation } from './pages/Estimation';
import { HowToBuy } from './pages/HowToBuy';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'catalogo', Component: Catalog },
      { path: 'catalogo/:category', Component: Catalog },
      { path: 'producto/:id', Component: ProductDetail },
      { path: 'estimacion', Component: Estimation },
      { path: 'como-comprar', Component: HowToBuy },
      { path: 'sobre-viback', Component: About },
      { path: 'contacto', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
]);