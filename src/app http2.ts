import http2 from 'http2';
import fs from 'fs';


const server = http2.createSecureServer({
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
    
}, (req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('js')) {
        res.writeHead(200,{'Content-Type': 'application/javascript'});
    } else if (req.url?.endsWith('css')) {
        res.writeHead(200,{'Content-Type': 'text/css'});
    }

    if (req.url === '/favicon.ico') {
        res.writeHead(204); // No content for favicon
        res.end();
        return;
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
    } catch (error) {
        // Manejar el error de archivo no encontrado
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File not found');
    }
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});
