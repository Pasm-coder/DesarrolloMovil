import { User } from "../domain/User";
import { UserPort } from "../domain/UserPort";
import bcrypt from "bcryptjs";
import { AuthService } from "../application/AuthService";

export class UserApplication{
    private port: UserPort;

    constructor(port: UserPort) {
        this.port = port;
    }

    async login(email: string, password: string): Promise <string>{ 
         const existingUser = await this.port.getUserByEmail(email);
         if(!existingUser) {
            throw new Error("Credenciales no validas");
         }

     const passwordMatch = await bcrypt.compare(password, existingUser.password); 
     if (!passwordMatch) { 
        throw new Error ("Credenciales invalidas");
     }    

     const token = AuthService.generateToken({
        id: existingUser.id,
        email: existingUser.email
     });
     return token;
    }

    async createUser(user: Omit<User, "id">): Promise<number> {
    const existingUser = await this.port.getUserByEmail(user.email);
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return this.port.createUser(user);
        //throw new Error("User with this email already exists");
    }
    throw new Error("User with this email already exists");
    //return this.port.createUser(user);
}

    

    async getUserById(id: number): Promise<User | null> {
        return await this.port.getUserById(id);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.port.getUserByEmail(email);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.port.getAllUsers();
    }

    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (user.email) {
            const emailTaken = await this.port.getUserByEmail(user.email);
            if (emailTaken && emailTaken.id !== id) {
                throw new Error("Email already taken");
            }
        }
        return await this.port.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<boolean> {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        return await this.port.deleteUser(id);
    }
}
