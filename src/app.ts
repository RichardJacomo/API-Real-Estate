import express, { Application } from "express";
import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import router from "../src/routers/users.routes";
import { handleError } from "./errors";
import routerLogin from "./routers/login.routes";
import routerCategories from "./routers/categories.routes";
import routerRealEstate from "./routers/realEstate.routes";
import routerSchedules from "./routers/schedules.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", router);
app.use("/login", routerLogin);
app.use("/categories", routerCategories);
app.use("/realEstate", routerRealEstate);
app.use("/schedules", routerSchedules);

app.use(handleError);

export default app;
