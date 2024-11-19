import bcrypt from 'bcrypt';

export default async function compareData(data : string | Buffer, encrypted : string): Promise<boolean> {
    return bcrypt.compareSync(data, encrypted);
}