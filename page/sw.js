// Change version of the cache when the data changes
var CACHE_NAME = 'v1';

// List urls you want to cache
var urlsToCache = [
	// '/offline.html'
];

self.addEventListener('install', function(event) {
	// Initialisation of the cache
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);

	// Clear old caches
	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key != CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}

				return fetch(event.request).catch(function(error) {
					
					if (event.request.mode === 'navigate' ||
						(event.request.method === 'GET' &&
						event.request.headers.get('accept').includes('text/html'))) {
						return caches.match('/offline.html');
					}
				});
			})
	);
});
