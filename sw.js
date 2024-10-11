// Escucha los eventos fetch
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('main.jpg')) {
        // Reemplaza main.jpg por alternative.jpg
        event.respondWith(fetch('/img/main-patas-arriba.jpg'));
    }
});
