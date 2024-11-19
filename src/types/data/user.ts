import { JwtPayload } from "jsonwebtoken";

export interface UserRegistration {
    first_name : string;
    last_name : string;
    email : string;
    username : string;
    password : string;
}

export interface LoginUserData {
    email : string;
    password : string;
}

export interface RefreshTokenData extends JwtPayload {
    userId : string;
    version : number;
}