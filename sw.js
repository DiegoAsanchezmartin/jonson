// Escucha los eventos fetch
self.addEventListener('fetch', (event) => {
    // Intercepta solicitudes del archivo CSS
    if (event.request.url.includes('style.css')) {
        console.log('Interceptando solicitud de style.css');
        let cssResponse = new Response(`
            body {
                background-color: red !important;
                color: pink;
            }
        `, {
            headers: {'Content-Type': 'text/css'}
        });
        event.respondWith(cssResponse);
    }

    // Intercepta solicitudes de la imagen main.jpg
    if (event.request.url.includes('main.jpg')) {
        console.log('Interceptando solicitud de main.jpg');
        event.respondWith(fetch('https://media.giphy.com/media/2t9sDPrlvFpdK/giphy.gif'));
    }

    // Interceptar la solicitud de un archivo específico para agregar más texto
    if (event.request.url.includes('index.html')) {
        console.log('Interceptando solicitud de index.html');
        let htmlResponse = new Response(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Mi PWA</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                <link rel="stylesheet" href="css/style.css">
            </head>
            <body class="container p-3">
            
                <img id="mainImage" src="img/main.jpg" alt="Vías del tren" class="img-fluid">
                
                <h1>Bienvenido</h1>
                <hr>
            
                <p>
                    Las PWA's son el siguiente paso a las páginas y aplicaciones web. Estas aplicaciones combinan lo mejor de las páginas web con la funcionalidad de las aplicaciones nativas.
                </p>
                <p>
                    Cargan sumamente rápido y no necesitan conexión a internet para trabajar.
                </p>

                <!-- Texto adicional desde el Service Worker -->
                <p>
                    Además de esto, las PWA permiten enviar notificaciones push, acceder a funcionalidades nativas como la cámara, y mucho más. ¡Son el futuro de las aplicaciones web!
                </p>
                
                <h2>Ejemplo Visual de PWA:</h2>

                <!-- Imagen reemplazada con un GIF desde el Service Worker -->
                <img src="https://media.giphy.com/media/2t9sDPrlvFpdK/giphy.gif" alt="GIF de PWA" class="img-fluid">

                <script src="js/app.js"></script>
            
            </body>
            </html>
        `, {
            headers: {'Content-Type': 'text/html'}
        });
        event.respondWith(htmlResponse);
    }
});
