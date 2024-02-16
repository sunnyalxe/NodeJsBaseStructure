import express from "express";
import bodyParser from "body-parser";
import allError from "./middleware/error_middleware.js";
import UserController from "./modules/user/userController.js";
import allRouter from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
const app = express();

//plugins for all requests
// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(allRouter);
app.use((req, res, next) => {
  if (req.body.debug && req.body.debug === "Yes") {
    const parsed = { DEBUG: "Yes" };
    dotenv.populate(process.env, parsed); //Add new ENV variables at run time for globly available.
  }
  else
  {
    const parsed = { DEBUG: "No" };
    dotenv.populate(process.env, parsed); //Add new ENV variables at run time for globly available.
  }
  next();
});

app.get("/", (req, res) => {
  console.log("hello");
  res.json({ status: 1, msg: "hello there" });
});

app.post("/login", (req, res, next) => {
  UserController.login(req, res, next);
});



app.use(allError);
app.use((req, res, next) => {
  console.log(res);
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is started as http://localhost:${PORT}`);
});
