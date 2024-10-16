console.log('El archivo app.js está cargado correctamente.');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Intentando registrar el Service Worker...');
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado con scope:', registration.scope);
            })
            .catch(error => {
                console.log('Error al registrar el Service Worker:', error);
            });
    });
  } else {
    console.log('El navegador no soporta Service Workers');
  }
  