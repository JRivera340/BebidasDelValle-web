/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/categoria/vinos', destination: '/categoria/bebidas', permanent: true },
      { source: '/categoria/licores', destination: '/categoria/bebidas', permanent: true },
      { source: '/producto/vino-cereza', destination: '/producto/vinifrut-cereza', permanent: true },
      { source: '/producto/vino-manzana', destination: '/producto/navifiest-manzana', permanent: true },
      { source: '/producto/vino-moscatel', destination: '/producto/vinifrut-uva', permanent: true },
      { source: '/producto/harina-natilla', destination: '/producto/la-molienda-natilla', permanent: true },
      { source: '/producto/harina-bunuelo', destination: '/catalogo', permanent: true },
      { source: '/producto/harina-arequipe', destination: '/catalogo', permanent: true },
      { source: '/producto/aperitivo-rumberito', destination: '/catalogo', permanent: true },
    ]
  },
}

module.exports = nextConfig
