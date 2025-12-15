import { DataSource } from 'typeorm'; //
import { Ciudad } from '../entities/Ciudad';
import { Equipo } from '../entities/Equipo';
import { Estadio } from '../entities/Estadio';
import { Pais } from '../entities/Pais';
import { Partido } from '../entities/Partido';
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config(); //
export const AppDataSource = new DataSource({ // Crear una nueva instancia de DataSource
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Ciudad, Equipo, Estadio, Pais, Partido, User],
    synchronize: true,
    logging: true,
});

// Conectar a la base de datos

export const connectDB = async () => { // Función asíncrona para conectar a la base de datos
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);;
    }
}