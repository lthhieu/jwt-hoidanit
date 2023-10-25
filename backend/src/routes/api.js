import express from "express"
import apiController from "../controllers/apiController"
import userController from '../controllers/userController'
import groupController from '../controllers/groupController'
import roleController from '../controllers/roleController'
import { checkUserJwt, checkUserPermission } from '../middlewares/jwtFunc'
const router = express.Router();
const initApiRoutes = (app) => {
    router.get("/test", apiController.test)
    router.use(checkUserJwt)
    router.use(checkUserPermission)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout)
    router.post("/register", apiController.handleRegister)
    router.get("/account", userController.getUserAccount)
    //group route
    router.get("/group/read", groupController.readFunc)
    //user route
    router.get("/user/read", checkUserJwt, checkUserPermission, userController.readFunc)
    router.post("/user/create", userController.createFunc)
    router.put("/user/update", userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)
    //role route
    router.get("/role/read", roleController.readFunc)
    router.post("/role/create", roleController.createFunc)
    router.put("/role/update", roleController.updateFunc)
    router.delete("/role/delete", roleController.deleteFunc)

    return app.use("/api/", router)
}
export default initApiRoutes