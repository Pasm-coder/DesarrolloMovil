import { UserApplication } from "../../application/UserApplication";
import { Request, Response } from "express";
import { User } from "../../domain/User";

export class UserController {
    private app: UserApplication;

    constructor(app: UserApplication) {
        this.app = app;
    }

async login(req: Request, res:Response): Promise <string | Response >{
  try{
   const {email, password} = req.body;
   if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña son requeridos"});

      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });

     const token = await this.app.login(email,password);
     return res.status(200).json({token});

  } catch (error){
   return res.status(401).json({ error: " Credenciales invalidas"});
  }
   
}

    
async createUser(req: any, res: any): Promise<Response> {
        const { name, email, password } = req.body;
        try {
            //Validaciones con expresiones regulares
            const namelRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if (!namelRegex.test(name.trim()))
                return res.status(400).json({ message: "El nombre no es válido" });

            if(!/^[\w=.*-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) 
                return res.status(400).json({ error: "El email no es válido" });

            if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
                return res.status(400).json({
                    error: "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número"
                });
                const status = 1;
                const user: Omit<User, "id"> = {name, email, password, status};
                const userId = await this.app.createUser(user);

                return res.status(201)
                .json({ message: "Usuario creado exitosamente", userId });
            } catch (error) {
                if(error instanceof Error){
                    return res.status(500)
                    .json({
                        error: "Error en el server ",
                        details: error.message
                    });
                }
                return res.status(500).json({error: "Error en el server ",});
            }
        }
    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "El ID debe ser un numero o ID inválido" });
            const user = await this.app.getUserById(id);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            return res.status(200).json(user);
        } catch (error) {
            if(error instanceof Error) {
                return res
                .status(500)
                .json({ 
                    error: "Error interno del servidor", 
                    details: error.message, 
                });
            }
            return res.status(500).json({ error: "Error en el servidor" });

        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<Response>{
        try {
            const { email } = req.params;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
                return res.status(400).json({ error: "El email no es válido" });
            //Validacion de email exitosa procedemos a buscar el usuario
            const user = await this.app.getUserByEmail(email);
            if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            return res.status(200).json(user);

        } catch (error) {
            if(error instanceof Error){
                return res.status(500).json({ 
                    error: "Error interno del servidor", 
                    details: error.message, 
                });
            }
            return res.status(500).json({ error: "Error en el servidor" });

        }
    }
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.app.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id))
                return res
                    .status(400)
                    .json({ error: "El ID debe ser un número o ID inválido" });

                const deleted = await this.app.deleteUser(id);
                if (!deleted) {
                    return res.status(404).json({ error: "Usuario no encontrado" });
                }
                return res.status(200).json({ message: "Usuario dado de baja correctamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al dar de baja", });
        }
    }
    async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "El ID es inválido" });

            let { name, email, password, status } = req.body;

            //Validaciones con expresiones regulares
            if(name && !/^[a-zA-Z\s]{3,}$/.test(name.trim()))
                return res
                    .status(400)
                    .json({ 
                        error: 
                        "El nombre no es válido" 
                    });

            if(email && !/^[\w=.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
                return res.status(400).json({ error: "El email no es válido" });

            if(password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.trim()))
                return res
                    .status(400)
                    .json({
                        error: "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número"
                    });

            status = 1;

            const updated = await this.app.updateUser(id, { 
                name, 
                email, 
                password, 
                status 
            });
            if (!updated) 
                return res
                    .status(404)
                    .json({ error: "Usuario no encontrado o sin cambios" });
            return res.status(200).json({ message: "Usuario actualizado con exito", user: updated });
            
        } catch (error) {
            if(error instanceof Error){
                return res.status(500).json({ 
                    error: "Error interno del servidor", 
                    details: error.message, 
                });
            }
            return res.status(500).json({ error: "Error en el servidor" });
        }
    }
}