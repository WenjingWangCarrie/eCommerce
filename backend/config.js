import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'nodereact',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AbtCbybBFaJEyUqifMFmWuR2Dof3n1iAtXMnzIDjEKFsEXwyn3OP0IAh0-CinU0b7zJ70yR9nCeKJ8Wx',
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}

