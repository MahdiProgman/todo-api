import { DataTypes, Model } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "../../types/models/user";
import { dataBase } from "../../config/db";


class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare username: string;
    declare password: string;
    declare join_date: string;
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