importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

/* global workbox */
if (workbox) {
  console.log("Workbox is loaded");

  /* injection point for manifest files.  */
  workbox.precaching.precacheAndRoute([]);

  /* custom cache rules*/
  workbox.routing.registerNavigationRoute("/index.html", {
    blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
  });

  workbox.core.setCacheNameDetails({
    prefix: "programming.in.th",
    suffix: "beta"
  });

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets"
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts-webfonts",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: "css-cache"
    })
  );

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst({
      cacheName: "javascript",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 1 * 24 * 60 * 60
        })
      ]
    })
  );
} else {
  console.log("Workbox could not be loaded. No Offline support");
}
