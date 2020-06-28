importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log("register workbox berhasil");
else console.log("Register workbox gagal");

workbox.precaching.precacheAndRoute([
  { url: "/", revision: 1 },
  { url: "/index.html", revision: 1 },
  { url: "/manifest.json", revision: 1 },
  { url: "/pages/home.html", revision: 1 },
  { url: "/pages/team.html", revision: 1 },
  { url: "/pages/favorite.html", revision: 1 },
  { url: "/materialize/css/materialize.min.css", revision: 1 },
  { url: "/materialize/js/materialize.min.js", revision: 1 },
  { url: "/js/db.js", revision: 1 },
  { url: "/js/getData.js", revision: 1 },
  { url: "/js/helper.js", revision: 1 },
  { url: "/js/idb.js", revision: 1 },
  { url: "/js/main.js", revision: 1 },
  { url: "/js/nav.js", revision: 1 },
  { url: "/css/style.css", revision: 1 },
  { url: "/components/nav.html", revision: 1 },
  { url: "/logo.png", revision: 1 },
]);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener("push", (event) => {
  let body = event.data ? event.data.text() : "Push Message no payload";

  let options = {
    body: body,
    vibrate: [100, 50, 100],
    image: "logo.png",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification(
      "Push Notification with payload",
      options
    )
  );
});
