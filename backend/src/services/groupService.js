import db from "../db/models"
const getAllGroups = async () => {
    try {
        let groups = await db.Group.findAll({
            attributes: ["id", "name", "description"]
        })
        if (groups) {
            return {
                em: "success",
                ec: "0",
                dt: groups
            }
        } else {
            return {
                em: "cannot get users",
                ec: "1",
                dt: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            em: "fail",
            ec: "1",
            dt: []
        }
    }
}
module.exports = { getAllGroups }