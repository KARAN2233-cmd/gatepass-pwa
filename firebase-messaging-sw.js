importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDbX44eylIbr2Fa9gRv7W5cJB0rWCvJ0W4",
  authDomain: "ajmergatepass.firebaseapp.com",
  projectId: "ajmergatepass",
  storageBucket: "ajmergatepass.firebasestorage.app",
  messagingSenderId: "704734310536",
  appId: "1:704734310536:web:5e9f46249c062077012f3d"
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
