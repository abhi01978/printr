self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(),
      icon: '/images/icon.png',
      badge: '/images/badge.png',
    };
  
    event.waitUntil(
      self.registration.showNotification('New Message', options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Handle the click event (e.g., open the app or focus on it)
  });
  