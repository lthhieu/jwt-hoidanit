import express from "express"
import homeController from "../controllers/homeController"
import apiController from "../controllers/apiController"
const router = express.Router();
const initWebRoutes = (app) => {
    router.get("/", homeController.helloWorld)
    router.get("/users", homeController.userPage)
    router.post("/users/create", homeController.createUser)
    router.post("/users/delete/:id", homeController.deleteUser)
    router.get("/users/update/:id", homeController.getUserInfoById)
    router.post("/users/update", homeController.updateUser)


    router.get("/api/test", apiController.test)
    return app.use("/", router)
}
export default initWebRoutes