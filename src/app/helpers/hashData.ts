import { API } from '@config/config';
import bcrypt from 'bcrypt';

export default async function hashData(data : string) : Promise<string> {
    const salt : string = await bcrypt.genSalt(API.HASH_SALT);
    const hashedData : string = await bcrypt.hash(data, salt);

    return hashedData;
}