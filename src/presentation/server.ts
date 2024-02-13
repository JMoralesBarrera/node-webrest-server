import express from 'express'
import path from 'path';

interface Options{

  port: number;
  public_path?: string;

}


export class Server {

    private app=express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options){
      const { port, public_path= 'public'}= options;
      this.port = port;
      this.publicPath= public_path;
    }

    async start() {
     

      



        //* Middleweres

        //*Public Folder

      this.app.use(express.static(this.publicPath))
      // estas lineas permiten que al recargar la aplicacion esta se renderice si se omite
      // la aplicacion se cae al recargarla.

      this.app.get('*',(req,res)=>{
        const indexPath = path.join(__dirname + `../../../${this.publicPath}index.html`);
        res.sendFile(indexPath)


      })
      this.app.listen(this.port, ()=>{
        console.log(`Server running in port ${this.port}`)

      })
       
    }

}