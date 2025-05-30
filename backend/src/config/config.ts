const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, PORT } =
  process.env;

export default {
  db_username: DB_USERNAME as string,
  db_password: DB_PASSWORD as string,
  db_host: DB_HOST as string,
  db_port: parseInt(DB_PORT as string),
  db_name: DB_NAME,
  port: PORT,
};
