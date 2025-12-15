import { Repository } from "typeorm";
import { User as UserDomain} from "../../domain/User";
import { User as UserEntity } from "../entities/User";
import { UserPort } from "../../domain/UserPort";
import { AppDataSource } from "../config/data-base";

export class UserAdapter implements UserPort {
    private userRepository: Repository<UserEntity>;
    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    private toDomain(user: UserEntity): UserDomain {
        return {
            id: user.id_user,
            name: user.name_user,
            email: user.email_user,
            password: user.password_user,
            status: user.status_user
        };
    }
    private toEntity(user: Omit<UserDomain, "id">): UserEntity {
        const userEntity = new UserEntity();
        userEntity.name_user = user.name;
        userEntity.email_user = user.email;
        userEntity.password_user = user.password;
        userEntity.status_user = user.status;
        return userEntity;
    }


    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        try{
            const newUser = this.toEntity(user);
            const savedUser = await this.userRepository.save(newUser);
            return savedUser.id_user;
        }catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Error creating user");
        }
    }
    async getUserById(id: number): Promise<UserDomain | null> {
        try{
            const user = await this.userRepository.findOne({ where: { id_user: id } });
            return user ? this.toDomain(user) : null;
        }catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Error fetching user by ID");
        }
    }
    async getUserByEmail(email: string): Promise<UserDomain | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email_user: email } });
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw new Error("Error fetching user by email");
        }
    }

    async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
            if (!existingUser) {
                throw new Error("User not found");
            }
            // Actualizamos los atributos no enviados
            Object.assign(existingUser, {
                name_user: user.name ?? existingUser.name_user,
                email_user: user.email ?? existingUser.email_user,
                password_user: user.password ?? existingUser.password_user,
                status_user: 1
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({ where: { id_user: id } });
            if (!existingUser) {
                throw new Error("User not found");
            }
            Object.assign(existingUser, {
                status_user: 0
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }

    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find();
            return users.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw new Error("Error fetching all users");
        }

    }
}