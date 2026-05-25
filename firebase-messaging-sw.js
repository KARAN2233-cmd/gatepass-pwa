// firebase-messaging-sw.js
// ✅ This file MUST be at the root of your GitHub Pages site
//    (same folder as index.html, NOT inside a subfolder)
//
//    For a repo named "gatepass-pwa" deployed to GitHub Pages:
//    https://<you>.github.io/gatepass-pwa/firebase-messaging-sw.js  ← CORRECT
//
//    If your repo is deployed from /docs or a branch root,
//    place this file there.

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey            : "VITE_FIREBASE_API_KEY",
  authDomain        : "VITE_FIREBASE_AUTH_DOMAIN",
  projectId         : "VITE_FIREBASE_PROJECT_ID",
  storageBucket     : "ajmergatepass.firebasestorage.app",
  messagingSenderId : "VITE_FIREBASE_MESSAGING_SENDER_ID",
  appId             : "VITE_FIREBASE_APP_ID"
});

const messaging = firebase.messaging();

// ── Background / closed-app notifications ─────────────
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message:', payload);

  const notification = payload.notification || {};
  const title  = notification.title || 'Gate Pass Alert';
  const body   = notification.body  || '';

  const options = {
    body              : body,
    icon              : 'icon.png',      // must exist in same folder
    badge             : 'icon.png',
    vibrate           : [200, 100, 200, 100, 200],
    requireInteraction: true,            // stays until dismissed on Android
    tag               : 'gate-pass',     // replaces previous notification instead of stacking
    data              : payload.data || {}
  };

  return self.registration.showNotification(title, options);
});

// ── Notification click → open/focus the app ───────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // No existing window — open a new one
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});
