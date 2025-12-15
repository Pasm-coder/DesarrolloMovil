import express, { Request, Response } from "express";
import ciudadRoutes from "../routes/CiudadRoutes";
import equipoRoutes from "../routes/EquipoRoutes";
import estadioRoutes from "../routes/EstadioRoutes";
import paisRoutes from "../routes/PaisRoutes";
import partidoRoutes from "../routes/PartidoRoutes";
import userRoutes from "../routes/UserRoutes";

class App{
    private app: express.Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json()); 
    }

    private routes():void{
        this.app.use("/api", ciudadRoutes, equipoRoutes, estadioRoutes, paisRoutes, partidoRoutes, userRoutes);
    }
    getApp(): express.Application {
        return this.app;
    }
    

}

export default new App().getApp();




