import http from 'http';
import fs from 'fs';



const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(htmlFile);
        return
    }

    if(req.url?.endsWith('js')){

        res.writeHead(200,{'Content-Type': 'application/javascript'});
       
    }else if(req.url?.endsWith('css')){
        res.writeHead(200,{'Content-Type': 'text/css'});
    }

    if (req.url === '/favicon.ico') {
        res.writeHead(204); // No content for favicon
        res.end();
        return;
    }

     const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(responseContent); 
});

    


   server.listen(8080,()=>{
       console.log('Server running on port 8080')
  })