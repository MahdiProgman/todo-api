import { DataTypes, Model } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "@type/models/user";
import { dataBase } from "@config/db";
import jwt from 'jsonwebtoken';
import { API } from "@config/config";

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare refresh_token : string | null;
    declare refresh_token_version : number | null;
    declare join_date: string;

    static generateAccessToken(userId : string){
        return jwt.sign({
            userId : userId
        }, API.ACCESS_TOKEN_SECRET, {
            expiresIn : '15m'
        });
    }

    static generateRefreshToken(userId : string, version : number){
        return jwt.sign({
            userId : userId,
            version : version
        }, API.REFRESH_TOKEN_SECRET, {
            expiresIn : '7d'
        });
    }
}

UserModel.init(
    {
        id : {
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            primaryKey : true
        },
        first_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        last_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        refresh_token : {
            type : DataTypes.STRING,
            defaultValue : null
        },
        refresh_token_version : {
            type : DataTypes.INTEGER,
            defaultValue : null
        },
        join_date : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    },
    {
        sequelize : dataBase,
        tableName : 'users',
        timestamps : true,
        indexes : [
            {
                name : 'idx_email',
                unique : true,
                fields : ['email']
            },
            {
                name : 'idx_username',
                unique : true,
                fields : ['username']
            }
        ]
    }
);

export default UserModel;