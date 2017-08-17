// https://codelabs.developers.google.com/codelabs/offline/#6
// this probably needs the same list of files as the express server.
// express server wants to serve them from / directly, service worker
// wants to cache them.
// needs webpack voodoo!
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('airhorner').then(function(cache) {
      return cache.addAll(['/', '/?utm_source=homescreen'])
    })
  )
})
