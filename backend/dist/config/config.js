"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, PORT } = process.env;
exports.default = {
    db_username: DB_USERNAME,
    db_password: DB_PASSWORD,
    db_host: DB_HOST,
    db_port: parseInt(DB_PORT),
    db_name: DB_NAME,
    port: PORT,
};
