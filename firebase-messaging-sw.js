importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey            : "YOUR_API_KEY",
  authDomain        : "YOUR_PROJECT.firebaseapp.com",
  projectId         : "YOUR_PROJECT_ID",
  storageBucket     : "YOUR_PROJECT.appspot.com",
  messagingSenderId : "YOUR_SENDER_ID",
  appId             : "YOUR_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const n = payload.notification;
  self.registration.showNotification(n.title, {
    body  : n.body,
    icon  : '/gatepass-pwa/icon.png',
    badge : '/gatepass-pwa/icon.png',
    vibrate: [200, 100, 200],
    requireInteraction: true
  });
});
