import knex from "knex";
import knexConfig from "../knexfile.js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const currentEnv = process.env.NODE_ENV || "development";
const knexDb = knex(knexConfig[currentEnv]);

knexDb.on("query", (queryData) => {
  if (process.env.DEBUG === "Yes") {
    console.log("Last Executed Query:", queryData.sql);
    console.log("Query Bindings:", queryData.bindings);
  }
});

export default knexDb;
