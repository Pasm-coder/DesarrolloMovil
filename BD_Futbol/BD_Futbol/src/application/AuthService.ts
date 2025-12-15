import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "adhakhdksahdiuwhiuafgiaudfh223";
export class AuthService{
    static generateToken(payload: object):string{
         return jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
    }

    static verifyToken(token: string): any{
        return jwt.verify(token, JWT_SECRET);

    }

    //static verifyToken(token: string): any{
        //return jwt.verify(this.verifyToken, JWT_SECRET)

    //}
}