importScripts('https://unpkg.com/workbox-sw@1.3.0')

// Create Workbox service worker instance
const workboxSW = new WorkboxSW({ clientsClaim: true })

// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([])

// Register png files e.g. https://localhost:3000/images/1.png
workboxSW.router.registerRoute(/\.png$/, workboxSW.strategies.networkFirst())

// Register example path e.g. https://localhost:3000/example
workboxSW.router.registerRoute(
  '/example',
  workboxSW.strategies.staleWhileRevalidate()
)

// Register express like route paths e.g. https://localhost:3000/list/one
workboxSW.router.registerRoute(
  '/list/:itemId',
  workboxSW.strategies.staleWhileRevalidate({
    cacheName: 'cache-with-expiration',
    cacheExpiration: {
      maxEntries: 20,
      maxAgeSeconds: 120,
    },
  })
)
