import express from "express"
import apiController from "../controllers/apiController"
import userController from '../controllers/userController'
import groupController from '../controllers/groupController'
const router = express.Router();
const initApiRoutes = (app) => {
    router.get("/test", apiController.test)

    router.post("/login", apiController.handleLogin)
    router.post("/register", apiController.handleRegister)
    router.get("/user/read", userController.readFunc)
    router.put("/user/update", userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)

    router.get("/group/read", groupController.readFunc)

    return app.use("/api/", router)
}
export default initApiRoutes