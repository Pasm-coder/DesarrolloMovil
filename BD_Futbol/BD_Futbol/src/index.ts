import "./infraestructure/config/enviroment-vars";
import app from "./infraestructure/web/app";
import { ServerBootstrap } from "./infraestructure/bootstrap/server.boostrap";
import { connectDB } from "./infraestructure/config/data-base";

const server = new ServerBootstrap(app);
(async () => {
        try{
            await connectDB();
            const instances = [server.init()];
            await Promise.all(instances);
        } catch (error) {
            console.error(error);
        }
    }
)();




