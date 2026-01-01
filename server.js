import { getMysqlConnection, initSqlDb } from "./utils/sql.js";
import { initMongoDb, getMongoDbConnection } from "./utils/mongodb.js";
import express from "express";
import users from "./routes/users.routes.js";
import massege from "./routes/massege.routes.js";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(async (req, res, next) => {
  req.mysqlConn = await getMysqlConnection();
  req.mongoDbConn = await getMongoDbConnection();
  next();
});
app.use("/api/users", users);
app.use("/api/message", massege);
app.use("/api/auth/", users);

app.listen(PORT, async () => {
  await initMongoDb();
  await initSqlDb();
  console.log(`Server is running on port ${PORT}...`);
});
