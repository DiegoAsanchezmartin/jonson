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
            headers: { 'Content-Type': 'text/css' }
        });
        event.respondWith(cssResponse);
    }

    // Intercepta solicitudes de la imagen main.jpg con validación
    if (event.request.url.includes('main.jpg')) {
        console.log('Interceptando solicitud de main.jpg');
        event.respondWith(
            fetch('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG1ueXV3cHcydDl6ZHkzaTZpYnJyeGU1dTZsY3VoOHVpM2Q1MDdweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/BMuAGGcvjLnTCIdFMX/giphy.gif')
                .then(response => {
                    if (response.ok) {
                        console.log('Imagen cargada correctamente.');
                        return response;
                    } else {
                        console.error('Error al cargar la imagen, estado:', response.status);
                        return new Response('Imagen no disponible', {
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    }
                })
                .catch(error => {
                    console.error('Error de red:', error);
                    return new Response('Error de conexión', {
                        headers: { 'Content-Type': 'text/plain' }
                    });
                })
        );
    }

    // Interceptar la solicitud de index.html con validación
    if (event.request.url.includes('index.html')) {
        console.log('Interceptando solicitud de index.html');
        event.respondWith(
            fetch(event.request).then(response => {
                if (response.ok) {
                    console.log('Página cargada correctamente.');
                    let modifiedHtml = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Mi PWA</title>
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
                            <link rel="stylesheet" href="css/style.css">
                        </head>
                        <body class="container p-3">
                            <img id="mainImage" src="img/main.jpg" alt="Vías del tren" class="img-fluid">
                            <h1>Bienvenido</h1>
                            <hr>
                            <p>Las PWA's son el siguiente paso a las páginas y aplicaciones web...</p>
                            <h2>Ejemplo Visual de PWA:</h2>
                            <img src="https://media.giphy.com/media/2t9sDPrlvFpdK/giphy.gif" alt="GIF de PWA" class="img-fluid">
                            <script src="js/app.js"></script>
                        </body>
                        </html>
                    `;
                    return new Response(modifiedHtml, {
                        headers: { 'Content-Type': 'text/html' }
                    });
                } else {
                    console.error('Error al cargar index.html:', response.status);
                    return new Response('Página no disponible', {
                        headers: { 'Content-Type': 'text/plain' }
                    });
                }
            }).catch(error => {
                console.error('Error de red:', error);
                return new Response('Error de conexión', {
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
        );
    }
});