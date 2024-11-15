import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./config";
import { errorLogger, logError, logger } from "./logger";
import UserModel from "../app/models/user.model";

export const dataBase : Sequelize = new Sequelize(DB_CONFIG);
export const connectToDB : ()=> Promise<void> = async ()=> {
    try {
        await dataBase.authenticate();
        logger.info(`THE APP was connected to ${DB_CONFIG.dialect} successfully!`);
        await dataBase.sync()
        .then(()=> logger.info('DB Is Synced Successfully!'))
        .catch((err)=> {
            logError(`THE APP was could't connect to ${DB_CONFIG.dialect}`);
            errorLogger.error(err, 'a problem on syncing DB');
        });

    } catch (err){
        logError(`Unfortunately THE APP could't connect to ${DB_CONFIG.dialect}`);
        errorLogger.error(err, `a problem on connecting to ${DB_CONFIG.dialect}`);
    }
}